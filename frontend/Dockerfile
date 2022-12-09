FROM node:lts-alpine@sha256:67373bd5d90ea600cb5f0fa58d7a5a4e6ebf50b6e05c50c1d1cc22df5134db43 AS compiler
RUN apk add --no-cache libc6-compat
WORKDIR /frontend
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
ENV NEXT_PUBLIC_ASSETS_URL https://assets.behindgiant.liobr.dev
ENV NEXT_PUBLIC_IMAGES_URL ${NEXT_PUBLIC_ASSETS_URL}/media/images
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN npm run build

FROM node:lts-alpine@sha256:67373bd5d90ea600cb5f0fa58d7a5a4e6ebf50b6e05c50c1d1cc22df5134db43 AS cleanup
WORKDIR /frontend
COPY --from=compiler /frontend/.next ./.next
COPY --from=compiler /frontend/public ./public
COPY --from=compiler /frontend/package.json ./package.json
COPY --from=compiler /frontend/package-lock.json ./package-lock.json
RUN npm install --omit=dev

FROM node:lts-alpine@sha256:67373bd5d90ea600cb5f0fa58d7a5a4e6ebf50b6e05c50c1d1cc22df5134db43 AS runner
WORKDIR /frontend
RUN addgroup -g 1001 -S frontend_group
RUN adduser -S frontend_user -u 1001
COPY --from=cleanup --chown=frontend_user:frontend_group /frontend ./
EXPOSE 3000
