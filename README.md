Setup

Clone the repository

```bash
git clone https://github.com/your-username/project-name.git
cd project-name
```

Docker

Build & Run

```bash
docker compose up --build -d
```

Stop containers

```bash
docker compose down
```



## Project setup (without docker)

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
