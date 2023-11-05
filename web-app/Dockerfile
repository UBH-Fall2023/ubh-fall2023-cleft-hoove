# Install dependencies only when needed
FROM node:18.0.0 AS deps
#RUN apk add --no-cache libc6-compat git
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Rebuild the source code only when needed
FROM node:18.0.0-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN yarn build

RUN addgroup --system --gid 1001 bronosgroup
RUN adduser --system --uid 1001 bronos

USER bronos

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]



# Production image, copy all the files and run next
# FROM node:18.0.0-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production

# RUN addgroup --system --gid 1001 bronosgroup
# RUN adduser --system --uid 1001 bronos

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=bronos:bronosgroup /app/.next/standalone ./
# COPY --from=builder --chown=bronos:bronosgroup /app/.next/static ./.next/static

