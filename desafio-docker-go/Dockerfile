FROM golang:alpine3.14 as builder

WORKDIR /app

COPY . .

RUN go build -o /main main.go

FROM scratch

WORKDIR /

COPY --from=builder /main /main

ENTRYPOINT ["/main"]