## GraphQL NodeJS

This project was created following the tutorial on [How To GraphQL](https://www.howtographql.com/graphql-js/0-introduction/) with Prisma deployed to Docker containers.

## Commands

Start Prisma server with database.
```
docker-compose up -d
```

When datamodel.graphql is amended, redeploy Prisma. Without .graphqlconfig.yml, run the below command in database directory containing prisma.yml. With .graphqlconfig.yml, the below command can be ran from folder directory.
```
prisma deploy
```

Start GraphQL playground (after Prisma server started)
```
node src/index.js
graphql playground
```

## Built With

* GraphQL
* NodeJS
* Docker
