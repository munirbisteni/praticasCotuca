import express from "express";
import * as commands from "../commands";
import * as tables from "../tables";
import { ComandoSQL } from "../interfaces";
import * as validadores from "../validate";
const router = express.Router();
import { verificarToken } from "./verificarToken";


router.get("/listarFabricantes", verificarToken, async (req, res) => {
    await commands.listarDados("FABRICANTE", "rowsToFabricantes", res);
  });

router.put("/inserirFabricantes", verificarToken, async (req, res) => {
    const fabricante: tables.fabricante = req.body as tables.fabricante;
    const cmdInsert = `insert into fabricante (nomeFabricante) values (:1)`;
    
    const dados = [fabricante.nomeFabricante];
    const comandoSQL: ComandoSQL<string | undefined> = { sql: cmdInsert, dados: dados };
    await commands.inserirDados(comandoSQL, res, () => validadores.fabricanteValido(fabricante));
  });
  
router.delete("/excluirFabricantes", verificarToken, async (req, res) => {
    const comandoSQL: ComandoSQL<number> = { sql: `DELETE Fabricante WHERE idFabricante = :1`, dados: [req.body.idFabricante as number]};
    await commands.excluirDados(comandoSQL, res);
  });

router.put("/alterarFabricantes", verificarToken, async(req,res)=>{ 
    const insert : tables.fabricante = req.body as tables.fabricante;
    if(insert.nomeFabricante === undefined || insert.idFabricante === undefined){
      res.send({status: "ERROR", message: "Faltam dados", payload: undefined});
      return;
    }
    const cmdInsert = `UPDATE FABRICANTE SET nomeFabricante = :1 WHERE idFabricante = :2`;
    const dados = [insert.nomeFabricante, insert.idFabricante]
    const comandoSQL: ComandoSQL <string | number |undefined> = {
        sql: cmdInsert,
        dados: dados
    };
    await commands.comandoGenerico(comandoSQL, res);
  });
export default router;