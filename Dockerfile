FROM node:12.13.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . .

RUN npm ci --only=production && \
    npm run build:client

EXPOSE 5000
CMD [ "node", "api/index.js" ]