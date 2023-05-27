import { PoolConfig } from "pg";

export const config: PoolConfig = {
    host: "localhost", // host do banco. Se for local é "localhost". Se for remoto, é o endereço IP
    port: 5432, // porta onde o Postgres está rodando no seu PC. O padrão é 5432
    user: "postgres", // usuário do Postgres. O padrão é "postgres"
    password: "postdba", // senha do Posgres. O padrão é "postdba"
    database: "bdprodutos" // nome do banco de dados
}