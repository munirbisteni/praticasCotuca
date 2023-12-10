
import express from "express";
import * as commands from "../commands";
import * as tables from "../tables";
import { ComandoSQL } from "../interfaces";
import * as validadores from "../validate";
const router = express.Router();
import { verificarToken } from "./verificarToken";
router.get("/listarPecas", verificarToken, async (req, res) => {
    // Passa o nome da função como uma string
    await commands.listarDados("PECA", "rowsToPecas", res);
  });

  router.put("/inserirPecas", verificarToken, async (req, res) => {
    const peca: tables.peca = req.body as tables.peca;

    const cmdInsert = `insert into peca (nomePeca, preco, idFabricante) values(:1, :2, :3)`;
    const dados = [peca.nomePeca, Number(peca.preco), Number(peca.idFabricante)];
    const comandoSQL: ComandoSQL<string |  undefined> = { sql: cmdInsert, dados:[String(dados)]};
    await commands.inserirDados(comandoSQL, res, () => validadores.pecaValida(peca));
  });
  
router.delete("/excluirPecas", verificarToken, async (req, res) => {
    const comandoSQL: ComandoSQL<number> = { sql: `DELETE Peca WHERE idPeca = :1`, dados: [req.body.idPeca as number]};
    await commands.excluirDados(comandoSQL, res);
  });

  router.put("/alterarPecas", verificarToken, async(req,res)=>{ 
    const insert : tables.peca = req.body as tables.peca;
    if (insert.nomePeca === undefined || insert.preco === undefined || insert.idFabricante === undefined || insert.idPeca === undefined)
    {
      res.send({status: "ERROR", message: "Faltam dados", payload: undefined});
      return;
    }
    const cmdInsert = `UPDATE PECA SET nomePeca = :1, preco =:2, idFabricante=:3 WHERE idPeca = :4`;
    const dados = [insert.nomePeca, insert.preco, insert.idFabricante, insert.idPeca]
    const comandoSQL: ComandoSQL <string | number |undefined> = {
        sql: cmdInsert,
        dados: dados
    };
    await commands.comandoGenerico(comandoSQL, res);
  });
  export default router;