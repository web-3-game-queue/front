FROM node:14.21.3-alpine
WORKDIR /app

COPY . .
CMD ["rm", ".env"]

ENTRYPOINT [ "npm", "run", "start" ]