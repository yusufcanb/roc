ARG DEBIAN_VERSION=bullseye
ARG GO_VERSION=1.19

FROM golang:${GO_VERSION}-${DEBIAN_VERSION} AS go

FROM mcr.microsoft.com/devcontainers/typescript-node:16-bullseye

# Install Go 1.18 Toolchain
COPY --from=go /usr/local/go /usr/local/go
ENV GOPATH=/go
ENV PATH=$GOPATH/bin:/usr/local/go/bin:$PATH \
    CGO_ENABLED=0 \
    GO111MODULE=on

# Install E2E Requirements
RUN apt-get update
RUN apt-get install python3 python3-pip python3-venv
RUN pip3 install e2e/requirements.txt

RUN npm install -g lerna
COPY . .
