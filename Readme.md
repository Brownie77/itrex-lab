# Docker

To start the application, go to the api directory, set configuration you need in <b>.env</b> file, go back to the root directory and run:

To store both queue and resolutions in app memory:

```bash
docker-compose --profile inmemory up -d
```

To store either one or both in Redis:

```bash
docker-compose --profile redis up -d
```

To store resolutions in MySQL, in this case doesn't matter where the queue is stored(in app/redis):

```bash
docker-compose --profile mixed up -d
```

The API server will start on [localhost:8080](http://localhost:8080), the client server will start on [localhost:3000](http://localhost:3000)

To stop the application, in the root directory run:

```bash
docker-compose down
```

## MySQL relations

![relations](/api/relations.png?raw=true)

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

Some of the tests will need some time to finish. <b>ETA: 2 minutes</b>;
