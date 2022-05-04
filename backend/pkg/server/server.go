package server

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"regexp"
	"time"

	"github.com/matherique/cakesie.app-backend/pkg/utils"
)

type Server struct {
	port string
	log  *log.Logger

	routes map[string]http.Handler
}

func NewServer(port string) *Server {
	s := new(Server)
	s.port = port
	s.log = utils.NewLogger("Server")
	s.routes = make(map[string]http.Handler)

	return s
}

type Routes interface {
	Routes() map[string]http.Handler
}

func (srv *Server) Start(ctx context.Context) error {
	s := http.Server{
		Addr:    srv.port,
		Handler: srv,
	}

	go func() {
		if err := s.ListenAndServe(); err != nil {
			srv.log.Fatal(err)
		}
	}()

	srv.log.Printf("server start in: localhost%s\n", srv.port)

	<-ctx.Done()

	srv.log.Println("server stoped")

	ctxSD, cancel := context.WithTimeout(context.Background(), 5*time.Second)

	defer func() {
		cancel()
	}()

	if err := s.Shutdown(ctxSD); err != nil {
		return err
	}

	srv.log.Printf("server exited properly")

	return nil
}

func (srv *Server) Add(re string, handler http.Handler) error {
	if _, err := regexp.Compile(re); err != nil {
		return fmt.Errorf("could not compile %q regexp : %v", re, err)
	}

	srv.routes[re] = handler

	return nil
}

func (srv *Server) AddAll(routes Routes) error {
	for re, handler := range routes.Routes() {
		if err := srv.Add(re, handler); err != nil {
			return err
		}

	}
	return nil
}

func (srv *Server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	for regex, handler := range srv.routes {
		route := fmt.Sprintf("%s %s", r.Method, r.URL.Path)
		if regexp.MustCompile(regex).MatchString(route) {
			handler.ServeHTTP(w, r)
			return
		}
	}

	http.NotFound(w, r)
}
