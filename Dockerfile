FROM node:16.14.2

WORKDIR /myapp

COPY package.json /myapp/

# Install production dependencies
RUN npm install --production

COPY src/ /myapp/src/

CMD ["node", "src/index.js"]