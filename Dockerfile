
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
EXPOSE 5173
CMD ["pnpm", "dev", "--host"]
