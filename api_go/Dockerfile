# syntax=docker/dockerfile:1

# Create a stage for building the application.
ARG GO_VERSION=1.21
FROM --platform=$BUILDPLATFORM golang:${GO_VERSION} AS build
WORKDIR /src

# Move go.mod and go.sum to a different directory and copy them into /src.
COPY go.mod go.sum /app/
WORKDIR /app
RUN go mod download -x

# Switch back to /src and copy the rest of the application source code.
WORKDIR /src
COPY . .

# Build the application.
RUN --mount=type=cache,target=/go/pkg/mod/ \
    CGO_ENABLED=0 GOARCH=$TARGETARCH go build -o /bin/server .

# Create a new stage for running the application.
FROM alpine:latest AS final

# Install runtime dependencies.
RUN --mount=type=cache,target=/var/cache/apk \
    apk --update add \
        ca-certificates \
        tzdata \
        && \
        update-ca-certificates

# Create a non-privileged user.
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser

# Copy the executable from the "build" stage.
COPY --from=build /bin/server /bin/

# Expose the port that the application listens on.
EXPOSE 8080

# Set the container entry point.
ENTRYPOINT [ "/bin/server" ]
