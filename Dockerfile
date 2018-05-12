FROM node

# install dependencies 
RUN apt-get update
RUN apt-get install  git

# get backend
RUN git clone https://github.com/danielrvt/google-rank-api.git \
    && cd google-rank-api \
    && npm install

EXPOSE 8090

# run backend
CMD ["node", "/google-rank-api/app.js"]

