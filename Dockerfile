FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .
RUN bun run format:check
RUN bun run build

FROM scratch
COPY --from=builder /app/dist /app/dist

CMD ["tail", "-f", "/dev/null"]
