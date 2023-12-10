import * as tables from "./tables";

export type ConvertFunction<T> = (oracleRows: unknown[] | undefined) => T;

export function rowsToUsuarios(oracleRows: unknown[] | undefined) : Array<tables.usuario> {
    let usuarios: Array<tables.usuario> = [];
    let usuario;
    if (oracleRows !== undefined){ 
      oracleRows.forEach((registro: any) => {
        usuario = {
          lgn: registro.LGN,
          prenome: registro.PRENOME,
          sobrenome: registro.SOBRENOME
        } as tables.usuario;
  
        // inserindo o novo Array convertido.
        usuarios.push(usuario);
      })
    }
    return usuarios;
  }

  
export function rowsToPecas(oracleRows: unknown[] | undefined) : Array<tables.peca> {
    let pecas: Array<tables.peca> = [];
    let peca;
    if (oracleRows !== undefined){ 
      oracleRows.forEach((registro: any) => {
        peca = {
          idPeca: registro.IDPECA,
          nomePeca: registro.NOMEPECA,
          preco: registro.PRECO,
          idFabricante: registro.IDFABRICANTE
        } as tables.peca;
  
        // inserindo o novo Array convertido.
        pecas.push(peca);
      })
    }
    return pecas;
  }

  
export function rowsToFabricantes(oracleRows: unknown[] | undefined) : Array<tables.fabricante> {
    let fabricantes: Array<tables.fabricante> = [];
    let fabricante;
    if (oracleRows !== undefined){ 
      oracleRows.forEach((registro: any) => {
        fabricante = {
          idFabricante: registro.IDFABRICANTE,
          nomeFabricante: registro.NOMEFABRICANTE,
        } as tables.fabricante;
  
        // inserindo o novo Array convertido.
        fabricantes.push(fabricante);
      })
    }
    return fabricantes;
  }
