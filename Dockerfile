FROM node:16.3.0

WORKDIR /usrc/app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY [".", "./"]

RUN yarn run build

EXPOSE 3001

CMD ["yarn", "run", "start"]
