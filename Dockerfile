FROM node:alpine

WORKDIR /typerscript

COPY ["package.json", "package-lock.json*", "tsconfig.json", "./"]
COPY ["./src", "./src"]

RUN npm install --omit=dev --loglevel verbose
RUN npm install typescript -g
RUN tsc -b

CMD [ "npx", "http-server", "./src" ]

