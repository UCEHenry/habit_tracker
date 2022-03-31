FROM node:12.18.4

EXPOSE 3000

RUN mkdir /code
WORKDIR /code
COPY . ./

RUN npm install
ENTRYPOINT ["/code/entrypoint.sh"]

CMD "npm run prod"
