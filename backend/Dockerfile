FROM golang:alpine AS builder

WORKDIR /app 

COPY go.mod .

RUN go mod download

COPY . .

RUN go build ./cmd/rpc

FROM alpine

WORKDIR /app

COPY --from=builder /app/rpc .

ENTRYPOINT ["/app/rpc"]

