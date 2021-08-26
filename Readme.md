# Application

To start the application with storing data in app memory, go to the api directory, set right configuration in <b>.env</b> file, go back to the root directory and run:

```bash
docker-compose --profile inmemory up -d
```

To start the application with storing data in redis, go to the api directory, set right configuration in <b>.env</b> file, go back to the root directory and run:

```bash
docker-compose --profile redis up -d
```

The API server will start on [localhost:8080](http://localhost:8080), the client server will start on [localhost:3000](http://localhost:3000)

To stop the application, in the root directory run:

```bash
docker-compose down
```

## Documentation

To get the information on how to access REST API routes documentation, check out the Readme file in the api directory.
