import { Router, Request, Response, response } from "express";
import { Marca } from "../model/marca";
import { createMarca, deleteMarcaById, getMarcaById, getMarcas, updateMarca } from "../service/marca.service";

export const MarcaResource = Router();

// Grava uma marca
MarcaResource.post("/", (req: Request, res: Response) => {
    const marca: Marca = req.body;
    createMarca(marca, res);
});

// Lista todas as marcas ou uma marca por Id
MarcaResource.get("/", (req: Request, res: Response) => {
    const params = req.query;
    if (params.idMarca) {
        getMarcaById(Number(params.idMarca), res);
    } else {
        getMarcas(res);
    }
});

// Atualiza uma marca
MarcaResource.put("/", (req: Request, res: Response) => {
    const marca: Marca = req.body;
    updateMarca(marca, res);
});

// Deleta uma marca
MarcaResource.delete("/", (req: Request, res: Response) => {
    const params = req.query;
    deleteMarcaById(Number(params.idMarca), res);
});


