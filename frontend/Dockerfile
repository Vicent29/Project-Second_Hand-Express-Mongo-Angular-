# STAGE 1
FROM node:19-alpine AS install
WORKDIR /app
COPY package.json .
RUN ["npm", "install"]

# STAGE 2
FROM node:19-alpine
WORKDIR /app
COPY --from=install /app/node_modules ./node_modules
COPY . .
RUN apk update && apk add bash
EXPOSE 4200