import * as tables from "./tables";

export async function usuarioValido(user: tables.usuario) {

    let valida = false;
    let mensagem = "";
    
    if(user.prenome === undefined)
      mensagem = "Prenome não informado.";
    
    
    if(user.sobrenome === undefined)
        mensagem = "Sobrenome não informado";
    
    if(user.senha === undefined)
        mensagem = "Senha não informada";
    
    let senha:string =String(user.senha);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if(!regex.test(senha))
        mensagem ="Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial e um número";

    if(mensagem === "")
      valida = true;
    
    return [valida, mensagem] as const;
  }
  
  export async function fabricanteValido(fabricante: tables.fabricante){
    let valida = false;
    let mensagem = "";
    if(fabricante.nomeFabricante === undefined)
      mensagem = "preencha o nome do fabricante!"
    if(mensagem === "")
    valida = true;
    return [valida, mensagem] as const;
  }

  export async function pecaValida(peca: tables.peca){
    let valida = false;
    let mensagem = "";
    
    if(peca.idFabricante === undefined)
      mensagem = "preencha o fabricante!"
    if(peca.nomePeca === undefined)
      mensagem = "preencha o nome da peça!"
    if(peca.preco === undefined)
      mensagem = "preencha o nome da peça!"
    
    if(mensagem === "")
      valida = true;
    return [valida, mensagem] as const;
  }