
# Most of the time, Alpine is a great base image to start with.
# If we're building a container for Python, we use something different.
# Learn why here: https://pythonspeed.com/articles/base-image-python-docker-images/
# TLDR: Alpine is very slow when it comes to running Python!

FROM node:16

ADD . /app

WORKDIR /app

RUN npm install

EXPOSE 3001
CMD [ "node", "server.js" ]