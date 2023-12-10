export type usuario = {
    lgn?: number,
    prenome?: string,
    sobrenome?: string,
    senha?: string
  }

export type peca = {
    idPeca?: number,
    nomePeca?: string,
    preco?: number,
    idFabricante?: number
}

export type fabricante = {
    idFabricante?: number,
    nomeFabricante?: string
}