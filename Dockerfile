FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .
RUN find . -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" | \
    xargs -I {} sh -c 'echo "Checking {}"; bunx prettier --check "{}" --loglevel debug || exit 0'
RUN bun run format:check
RUN bun run build

FROM scratch
COPY --from=builder /app/dist /app/dist

CMD ["tail", "-f", "/dev/null"]
