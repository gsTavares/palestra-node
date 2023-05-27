import { Router, Request, Response, response } from "express";
import { createProduto, getProdutos, getProdutoById, updateProduto, deleteProdutoById } from "../service/produto.service";
import { Produto } from "../model/produto";

export const ProdutoResource = Router();

// Grava um produto
ProdutoResource.post("/", (req: Request, res: Response) => {
    const produto: Produto = req.body;
    createProduto(produto, res);
});

// Lista todos os produtos ou um produto por Id
ProdutoResource.get("/", (req: Request, res: Response) => {
    const params = req.query;
    if (params.idProduto) {
        getProdutoById(Number(params.idProduto), res);
    } else {
        getProdutos(res);
    }
});

// Atualiza um produto
ProdutoResource.put("/", (req: Request, res: Response) => {
    const produto: Produto = req.body;
    updateProduto(produto, res);
});

// Deleta um produto
ProdutoResource.delete("/", (req: Request, res: Response) => {
    const params = req.query;
    deleteProdutoById(Number(params.idProduto), res);
});


