FROM node:latest

EXPOSE 3000

RUN mkdir /code
WORKDIR /code
COPY . /code/
RUN ["bash", "/code/entrypoint.sh"]
ENTRYPOINT ["/code/entrypoint.sh"]

CMD if [ "$NODE_ENV" = "development" ]; \
  then npm start;  \
  fi