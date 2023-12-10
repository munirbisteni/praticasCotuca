import React, { useState, useEffect } from 'react';
import Footer from '../footer';
import imageAlter from '../../assets/icons/alter_icon.png'
import imageDelete from '../../assets/icons/delete_icon.png'


function requestListarFabricante() {
    let token = localStorage.getItem('token');
        const requestOptions = {
          method: 'GET',
          headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
        };
        return fetch('http://localhost:3000/peca/listarPecas', requestOptions)
        .then(T => T.json())
}

function requestExcluirPeca(body) {
        let token = localStorage.getItem('token');
        const requestOptions = {
          method: 'DELETE',
          headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
          body: JSON.stringify(body)
        };
        return fetch('http://localhost:3000/peca/excluirPecas', requestOptions)
        .then(T => T.json())
}

function preencherTabela(content) {
    const handleLinkClick = (idPeca, nomePeca, preco, idFabricante) => {
        window.location.href = `/AlterarPeca/${idPeca}/${nomePeca}/${preco}/${idFabricante}`;
    };
    return (
            content.map(item => (
                <tr key={item.idPeca}>
                    <td className="table-item centerText">{item.idPeca}</td>
                    <td className="table-item leftText">{item.nomePeca}</td>
                    <td className="table-item rightText">R${item.preco}</td>
                    <td className="table-item leftText">{item.idFabricante}</td>
                    <td width="5%" className="centerText">
                    <img
                        src={imageDelete} alt="excluir"
                        onClick={() =>excluir(item.idPeca)}
                        className="centerText"
                    />
                    <img
                        src={imageAlter} alt="alterar"
                        onClick={() => handleLinkClick(item.idPeca, item.nomePeca, item.preco, item.idFabricante)}
                        className="centerText"
                    />
                    </td>
                </tr>
            ))
        );
}


function excluir(content){
    console.log('Clicou no excluir Modelo: ' + content);
    // vamos fazer a exclusão
    requestExcluirPeca({idPeca: Number(content)}).then(customResponse => {
      if(customResponse.status === "SUCCESS"){
        window.location.reload();
      }else{
        console.log(customResponse.message);
      }
    })
    .catch((e) => {
      console.log("Não foi possível excluir." + e);
    });
}

export function ListarPeca(){  
    const [dados, setDados] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const customResponse = await requestListarFabricante();
                if (customResponse.status === "SUCCESS") {
                    console.log("Dados dos fabricantes obtidos com sucesso!");
                    if (customResponse.payload !== null) {
                        setDados(customResponse.payload);
                    } else {
                        console.error("PAYLOAD VAZIO");
                    }
                } else {
                    acusarInvalida()
                }
            } catch (error) {
                console.error("Erro crítico! Possívelmente banco de dados fora do ar!", error);
                acusarInvalida()
            }
        }
        fetchData();
    }, []);

    function acusarInvalida(){
        handleErro(true);
    }

    const [isVisible, setIsVisible] = useState(false);          
    const handleErro = () => {
        setIsVisible(true);
    };

    return (
        <div className="main-login">
             <h1 className={isVisible ? "visible" : "hidden"}>Ocorreu um erro! Tente fazer o login novamente!</h1>
            {isVisible?console.log("erro"):
            <section className="tabela-lista">
                <table id="table" border="0" cellSpacing="5" cellPadding="10">
                    <thead className="cabecalho">
                        <tr>
                            <th className="centerText title">ID da Peça</th>
                            <th className="leftText title" >Nome da Peça</th>
                            <th className="rightText title">Valor da Peça</th>
                            <th className="leftText title" >ID do Fabricante</th>
                        </tr>
                    </thead>
                    <tbody>
                        {preencherTabela(dados)}
                    </tbody>
                </table>
            </section>
           }
            <Footer link="/Home"/>
        </div>
    )
}

export default ListarPeca;   