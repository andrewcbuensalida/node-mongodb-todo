FROM node:15
WORKDIR /todo
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --production; \
        fi
COPY . ./
ENV PORT 3500
# EXPOSE $PORT
CMD ["node", "script.js"]