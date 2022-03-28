FROM node:lts-slim
WORKDIR /usr/app/booth-backend;
RUN ["npm","install","-g","yarn"];

ARG PACKAGE_LOCKFILE_HASH;


COPY ./prisma ./prisma

ARG DATABASE_URL;
ARG PORT
ENV DATABASE_URL $DATABASE_URL;
ENV PORT $PORT;

RUN ["yarn","install"]
RUN ["yarn","build"]

ENTRYPOINT [ "yarn", "start:prod" ]