FROM node:22.14.0-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM nginx:1.28-alpine

COPY --from=build /app/out/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
	CMD wget --quiet --output-document=- http://127.0.0.1/ >/dev/null || exit 1
