# fossils

A handy tool for tracking fossil collection among friends in Animal Crossing: New Horizons.

To build and run all containers, using docker-compose:

* Production: `docker-compose up --build`
* Development: `docker-compose -f docker-compose.yml -f docker-compose-dev.yml up --build`

## app

To run the app locally:

* `cd app`
* `npm install`
* `npm run start:dev` _(production: `npm run start`)_
* [http://localhost:8080/api](http://localhost:8080/api)

To build and run the app with Docker:

* `cd app`
* `docker build -t fossils-app:dev -f Dockerfile-dev .` _(production: `docker build -t fossils-app .`)_
* `docker run -p 6001:8080 -v e:/fossils/app:/usr/src/app fossils-app:dev` _(production: `docker run -p 6001:8080 fossils-app`)_
    * _(Replace `e:/fossils` with the path where you've cloned this repo.)_
* [http://localhost:6001/api](http://localhost:6001/api)
    * _(Container will be left running; use `docker ps` and `docker stop <container-id>` to shut it down.)_
