FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .
RUN find . -type f \( -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" \) -not -path "./node_modules/*" | \
    xargs -I {} sh -c 'echo "Checking {}"; bunx prettier --check "{}" --log-level debug || echo "Error in {}"'
RUN bun run format:check
RUN bun run build

FROM scratch
COPY --from=builder /app/dist /app/dist

CMD ["tail", "-f", "/dev/null"]
