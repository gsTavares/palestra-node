import express from "express";
import cors from "cors";
import { MarcaResource } from "./resource/marca.resource";
import { ProdutoResource } from "./resource/produto.resource";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/marca", MarcaResource);
app.use("/produto", ProdutoResource);

app.listen(3000, () => console.log("HTTP Server Running!"));