FROM node:12.18.4

EXPOSE 3000

RUN mkdir /code
WORKDIR /code
COPY ./api

RUN ["chmod", "+x", "/code/entrypoint.sh"]
ENTRYPOINT ["/code/entrypoint.sh"]


CMD if [ "$NODE_ENV" = "development" ]; \
  then npm start;  \
  fi
