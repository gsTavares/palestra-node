import { Response } from "express";
import { Pool, PoolClient, QueryResult } from "pg";
import { config } from "../config/banco";
import { Produto } from "../model/produto";

export async function createProduto(produto: Produto, response: Response) {
    const pool: Pool = new Pool(config);
    const client: PoolClient = await pool.connect();

    try {
        const query: string = "INSERT INTO produto(id_marca, descricao, preco) VALUES ($1, $2, $3) RETURNING *";
        const result: QueryResult<Produto> = await client.query(query, [produto.idMarca, produto.descricao, produto.preco]);

        response.statusCode = 200;
        response.send({
            message: "ok!",
            body: result.rows[0]
        });
    } catch (error) {
        const err = error as Error;
        console.log(err);
        response.statusCode = 500;
        response.send({
            message: err.message
        });
    } finally {
        client.release();
    }
}

export async function getProdutos(response: Response) {

    const pool: Pool = new Pool(config);

    try {
        const query: string = "SELECT * FROM produto";
        const result: QueryResult<Produto> = await pool.query(query);

        if (result.rows.length === 0) {
            response.statusCode = 404;
            response.send({
                message: "lista de produtos está vazia!",
                body: result.rows
            });
        } else {
            response.statusCode = 200;
            response.send({
                message: "ok!",
                body: result.rows
            });
        }
    } catch (error) {
        const err = error as Error;
        console.log(err);
        response.statusCode = 500;
        response.send({
            message: err.message
        });
    }
}

export async function getProdutoById(idProduto: number, response: Response) {

    const pool: Pool = new Pool(config);

    if (!idProduto) {
        response.statusCode = 406
        response.send({
            message: "o ID do produto é necessário para a busca!"
        });
    } else {
        try {
            const query: string = "SELECT * FROM produto WHERE id = $1";
            const result: QueryResult<Produto> = await pool.query(query, [idProduto]);

            if (result.rows.length === 0) {
                response.statusCode = 404;
                response.send({
                    message: "produto não encontrado para o ID: " + idProduto,
                    body: result.rows
                });
            } else {
                response.statusCode = 200;
                response.send({
                    message: "ok!",
                    body: result.rows
                });
            }
        } catch (error) {
            const err = error as Error;
            console.log(err);
            response.statusCode = 500;
            response.send({
                message: err.message
            });
        }
    }

}

export async function updateProduto(produto: Produto, response: Response) {
    const pool: Pool = new Pool(config);
    const client: PoolClient = await pool.connect();

    if (!produto.id) {
        response.statusCode = 406;
        response.send({
            message: "o ID do produto é necessário para a atualização!"
        });
    } else {
        try {
            const query: string = "UPDATE MARCA SET id_marca = $1, descricao = $2, preco = $3 WHERE id = $4 RETURNING *";
            const result: QueryResult<Produto> = await client.query(query, [produto.idMarca, produto.descricao, produto.preco]);

            response.statusCode = 200;
            response.send({
                message: "atualizado!",
                body: result.rows[0]
            });
        } catch (error) {
            const err = error as Error;
            console.log(err);
            response.statusCode = 500;
            response.send({
                message: err.message
            });
        } finally {
            client.release();
        }
    }
}

export async function deleteProdutoById(idProduto: number, response: Response) {
    const pool: Pool = new Pool(config);
    const client: PoolClient = await pool.connect();

    if (!idProduto) {
        response.statusCode = 406;
        response.send({
            message: "o ID do produto é necessário para a atualização!"
        });
    } else {
        try {
            const query: string = "DELETE FROM produto WHERE id = $1";
            await client.query(query, [idProduto]);

            response.statusCode = 200;
            response.send({
                message: "deleted!",
            });
        } catch (error) {
            const err = error as Error;
            console.log(err);
            response.statusCode = 500;
            response.send({
                message: err.message
            });
        } finally {
            client.release();
        }
    }
}