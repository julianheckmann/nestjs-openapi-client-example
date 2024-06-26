# Simple NestJs OpenApi client generation example

This is a simple example how to generate a client from an OpenAPI definition generated by the `@nestjs/swagger` package. There are some packages which use the official generator from OpenAPI but this requires Java and I would like to not have that dependency.

In this example I utilize the `openapi-typescript-codegen` npm package which is able to generate a typescript generator fully in node.

**_Caution_** it is recommended to not run the generator within production environments as this slows down the start. Additionally there is no real need to generate a client in production mode. In this example the generator will be skipped if `NODE_ENV` is set to production. But there are many ways to achieve the same.

## How to run it

Install all dependencies

```bash
pnpm i
```

Start api dev server

```bash
make start-dev-server
```

Start client in watch mode

```bash
make start-dev-client
```

Start app in watch mode

```bash
make start-dev-app
```

Now you should have a client generated in the client package (./packages/client) which is symlinked to the app (./packages/app).
