Olá! Este é um projeto sendo desenvolvido para o segundo semestre no cotuca, em 2023!

Este projeto consiste em um sistema interno empresarial de cadastro, alteração, exclusão e listagem de peças de aeronaves e seus fabricantes!
Contém também um sistema de Login, que só permite o acesso do usuário ao estar logado dentro do sistema, e bloqueia todas as ações quando este não está com seu TOKEN válido!


Dentro do banco-de-dados note a existencia de duas procedures: 
cadastrar-usuario e validar-usuario, estas homologam a criação de usuários e garantem que os dados sejam guardados de forma criptografada!

Para iniciar este código, voce precisará apenas fazer 3 etapas!

1o - Criar um arquivo nomeado ".env" dentro de "backEnd/src/" e colocar as variáveis : 
      ORACLE_DB_USER= (seu usuário aqui)
      ORACLE_DB_PASSWORD= (sua senha aqui)
      ORACLE_CONN_STR= (sua string de conexão oracle aqui)
      SECRET= (sua secret para geração de um token aqui)

2o - abrir um terminal para a pasta "backEnd"
    2.1 - executar o comando "npm install"
    2.2 - executar o comando "npm start"

3o - abrir um terminal para a pasta "aero-pecas"
    3.1 - executar o comando "npm install"
    3.2 - executar o comando "npm start"

Bom divertimento explorando meu código! - Munir Bisteni
