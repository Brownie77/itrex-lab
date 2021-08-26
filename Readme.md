# Application

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

To get the information on how to access REST API routes documentation, check out the Readme file in the api directory.

## Unit tests

Navigate to the api directory and run:

```bash
npm test
```

Some of the tests will need some time to finish. <b>ETA: 3 minutes</b>;
