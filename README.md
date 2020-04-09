# fossils

A handy tool for tracking fossil collection among friends in Animal Crossing: New Horizons.

To build and run all containers, using docker-compose:

* Production: `docker-compose up --build`
* Development: `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build`
* _Frontend will be accessible via [http://localhost:3000](http://localhost:3000)._

The database volume (`fossils_pgdata`) will persist after shutting down; you can purge it with `docker-compose down -v` to clear all data and start fresh on your next run.

## db

To spin up a database container in Docker for testing:

* `cd db`
* `docker volume create pgtest` _(Will persist; remove with `docker volume rm pgtest`)_
* `docker build -t fossils-db .`
* `docker run -p 5442:5432 -v pgtest:/var/lib/postgresql/data -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres fossils-db`
* _Connect a postgres terminal with `psql -p 5442 -U postgres -d postgres` (password is `postgres`)._
* _Container will be left running; use `docker ps` and `docker stop <container-id>` to shut it down._

## app

To run the app locally:

* `cd app`
* `npm install`
* `npm run start:dev` _(production: `npm run start`)_
* _API will be accessible via [http://localhost:8080/api](http://localhost:8080/api)._

To build and run the app with Docker:

* `cd app`
* `docker build -t fossils-app:dev -f Dockerfile-dev .` _(production: `docker build -t fossils-app .`)_
* `docker run -p 3001:8080 -v e:/fossils/app:/usr/src/app fossils-app:dev` _(production: `docker run -p 3001:8080 fossils-app`)_
* _Replace `e:/fossils` with the path where you've cloned this repo._
* _API will be accessible via [http://localhost:3001/api](http://localhost:3001/api)._
* _Container will be left running; use `docker ps` and `docker stop <container-id>` to shut it down._

## frontend

To build the frontend locally:

* `cd frontend`
* `npm install`
* `npm run build:dev` _(production: `npm run build`)_
* _Webpack build artifacts will be in `frontend/public`._

To build and serve the frontend with Docker:

* `cd frontend`
* `docker build -t fossils-frontend:dev -f Dockerfile-dev .` _(production: `docker build -t fossils-frontend .`)_
* `docker run -p 3002:8080 -v e:/fossils/frontend/src:/usr/src/app/src fossils-frontend:dev` _(production: `docker run -p 3002:8080 fossils-frontend`)_
* _Replace `e:/fossils` with the path where you've cloned this repo._
* _Frontend will be accessible via [http://localhost:3002](http://localhost:3002)._
* _Container will be left running; use `docker ps` and `docker stop <container-id>` to shut it down._

## nginx

The nginx container sits in front of the backend app and the frontend, and serves as a reverse proxy to route requests to the appropriate service.
