package store

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

type Store interface {
	Connect() error
	Close() error
	WithDrive(drive string) Store
	DB() *sql.DB
}

type store struct {
	drive     string
	db        *sql.DB
	conString string
}

func NewStore(conString string) Store {
	s := new(store)
	s.conString = conString

	return s
}

func (s *store) WithDrive(drive string) Store {
	s.drive = drive

	return s
}

func (s *store) Connect() error {
	db, err := sql.Open(
		s.drive,
		s.conString,
	)

	if err != nil {
		return fmt.Errorf("could not open database connection: %v", err)
	}

	if err = db.Ping(); err != nil {
		db.Close()
		return fmt.Errorf("could not ping to database: %v", err)
	}

	s.db = db
	return nil
}

func (s *store) DB() *sql.DB {
	return s.db
}

func (s *store) Close() error {
	return s.db.Close()
}
