import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './components/login';
import { Index } from './components/index';
import { CadastrarPeca } from './components/peca/cadatrar-peca';
import {CadastrarFabricante} from './components/fabricante/cadastrar-fabricante';
import ListarFabricante from './components/fabricante/listar-fabricante';
import { AlterarFabricante } from './components/fabricante/alterar-fabricante';
import { AlterarPeca } from './components/peca/alterar-peca';
import ListarPeca from './components/peca/listar-peca';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Home" element={<Index/>}/>
          <Route path="/CadastrarPeca" element={<CadastrarPeca/>}/>
          <Route path="/CadastrarFabricante" element={<CadastrarFabricante/>}/>
          <Route path="/ListarFabricante" element={<ListarFabricante/>}/>
          <Route path="/AlterarFabricante/:id/:nome" element={<AlterarFabricante/>}/>
          <Route path="/ListarPeca" element={<ListarPeca/>}/>
          <Route path="/AlterarPeca/:idPeca/:nome/:preco/:idFabricante" element={<AlterarPeca/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

