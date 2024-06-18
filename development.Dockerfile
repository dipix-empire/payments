FROM node:18.18.2-alpine3.18
WORKDIR /app
EXPOSE 3200
EXPOSE 5555
CMD [ "yarn", "docker-dev" ]
