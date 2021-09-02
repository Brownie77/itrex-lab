# Docker

To start the application, go to the api directory, set configuration you need in <b>.env</b> file, go back to the root directory and run:

```bash
docker-compose up -d
```

The API server will start on [localhost:8080](http://localhost:8080), the client server will start on [localhost:3000](http://localhost:3000)

To stop the application, in the root directory run:

```bash
docker-compose down
```

## MySQL relations

![relations](/relations.png?raw=true)

## Documentation

The documentation for the API routes was made using [Swagger](https://swagger.io/tools/swagger-ui/).

To access the documentation, navigate to the api folder and install all the dependencies.

```bash
npm install
```

Then start the server.

```bash
npm start
```

And navigate to [http://localhost:8080/api-docs/](http://localhost:8080/api-docs/).

## Unit testing

Navigate to the api directory and run:

```bash
npm test
```
