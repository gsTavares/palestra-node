import { Response } from "express";
import { Pool, PoolClient, QueryResult } from "pg";
import { config } from "../config/banco";
import { Marca } from "../model/marca";

export async function createMarca(marca: Marca, response: Response) {
    const pool: Pool = new Pool(config);
    const client: PoolClient = await pool.connect();

    try {
        const query: string = "INSERT INTO marca(descricao) VALUES ($1) RETURNING *";
        const result: QueryResult<Marca> = await client.query(query, [marca.descricao]);

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

export async function getMarcas(response: Response) {

    const pool: Pool = new Pool(config);

    try {
        const query: string = "SELECT * FROM marca";
        const result: QueryResult<Marca> = await pool.query(query);

        if (result.rows.length === 0) {
            response.statusCode = 404
            response.send({
                message: "a lista de marcas está vazia!",
                body: []
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

export async function getMarcaById(idMarca: number, response: Response) {

    const pool: Pool = new Pool(config);

    if (!idMarca) {
        response.statusCode = 406
        response.send({
            message: "o ID da marca é necessário para a busca!"
        });
    } else {
        try {
            const query: string = "SELECT * FROM marca WHERE id = $1";
            const result: QueryResult<Marca> = await pool.query(query, [idMarca]);

            if (result.rows.length === 0) {
                response.statusCode = 404
                response.send({
                    message: "marca não econtrada para o ID: " + idMarca,
                    body: []
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

export async function updateMarca(marca: Marca, response: Response) {
    const pool: Pool = new Pool(config);
    const client: PoolClient = await pool.connect();

    if (!marca.id) {
        response.statusCode = 406;
        response.send({
            message: "o ID da marca é necessário para a atualização!"
        });
    } else {
        try {
            const query: string = "UPDATE MARCA SET descricao = $1 WHERE id = $2 RETURNING *";
            const result: QueryResult<Marca> = await client.query(query, [marca.descricao, marca.id]);

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

export async function deleteMarcaById(idMarca: number, response: Response) {
    const pool: Pool = new Pool(config);
    const client: PoolClient = await pool.connect();

    if (!idMarca) {
        response.statusCode = 406;
        response.send({
            message: "o ID da marca é necessário para a atualização!"
        });
    } else {
        try {
            const query: string = "DELETE FROM marca WHERE id = $1";
            await client.query(query, [idMarca]);

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