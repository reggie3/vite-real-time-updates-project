Vite Real Time Updates Project

A React application to try out distributed real time updates using the stack in the docker-compose file.

Based on [Docker Compose For Your Next Debezium And Postgres Project](https://www.iamninad.com/posts/docker-compose-for-your-next-debezium-and-postgres-project/)

Create a Debezium connector:

```
curl -X POST --location "http://localhost:8083/connectors" -H "Content-Type: application/json" -H "Accept: application/json" -d @connector.json
```
