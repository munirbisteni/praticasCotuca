import express from "express";
import * as commands from "../commands";
import * as tables from "../tables";
import { ComandoSQL } from "../interfaces";
import * as validadores from "../validate";
import { verificarToken } from "./verificarToken";

const router = express.Router();


router.get("/listarUsuarios", verificarToken, async (req, res) => {
    await commands.listarDados("USUARIO", "rowsToUsuarios", res);
  });

router.put("/validarUsuario", async (req, res) => {
    const usuario: tables.usuario = req.body as tables.usuario;
    const lgn = usuario.lgn;
    const senha = usuario.senha;
    if (lgn == undefined || senha == undefined){
      return;
    }
    await commands.validarUsuario(lgn, senha, res);
  });

  router.get("/isLoggedIn",verificarToken, async (req, res) => {
    res.send("1")
  });

router.put("/inserirUsuario", verificarToken, async (req, res) => {
    const usuario: tables.usuario = req.body as tables.usuario;
      
    const cmdInsert = `BEGIN insere_usuario(:1, :2, :3); END;`;
    const dados = [usuario.prenome, usuario.sobrenome, usuario.senha];


    const comandoSQL: ComandoSQL<string | undefined> = { sql: cmdInsert, dados: dados, };
    await commands.inserirDados(comandoSQL, res, () => validadores.usuarioValido(usuario));
  });
  
router.delete("/excluirUsuario",verificarToken, async (req, res) => {
    const usuario: tables.usuario = req.body as tables.usuario;
    const comandoSQL: ComandoSQL<number> = { sql: `DELETE usuario WHERE lgn = :1`, dados: [usuario.lgn as number]};
    await commands.excluirDados(comandoSQL, res);
  });
  
export default router;