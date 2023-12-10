import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../footer';
import { useParams } from 'react-router-dom';

export function AlterarPeca(){
    const navigate = useNavigate();
    async function fetchAlterar(body){
        let token = localStorage.getItem('token');

        const requestOptions = {
            method: 'PUT',
            headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        };
        let resp 
        await (resp = fetch('http://localhost:3000/peca/alterarPecas', requestOptions).then(T => T.json()))
        return resp;
    }
    function alterar(event){
        event.preventDefault();
        const idPeca = event.target.idPeca.value;
        const nomePeca = event.target.nomePeca.value;
        const preco = event.target.preco.value;
        const idFabricante = event.target.idFabricante.value;
        if(nomePeca === undefined || preco === undefined || idFabricante === undefined){
            acusarInvalida();
            return;
        }
        else{
            fetchAlterar({idPeca:idPeca, nomePeca:nomePeca, preco:preco, idFabricante:idFabricante}).then(customResponse=>{
                console.log(customResponse)
                if(customResponse.status === "SUCCESS"){
                        navigate("/ListarPeca")
                }
                else{
                    acusarInvalida();
                
                }
            }).catch(e =>{
                acusarInvalida();
            })
        }
    }

    function acusarInvalida(){
        handleErro(true);
    }



    let [nomePeca, setNomePeca] = useState('');
    
    const handleNomePeca = (event) => {
        setNomePeca(event.target.value);
    };

    let [prec, setPreco] = useState('');
    
    const handlePreco = (event) => {
        setPreco(event.target.value);
    };
    let [idFab, setIdFabricante] = useState('');
    
    const handleIdFabricante = (event) => {
        setIdFabricante(event.target.value);
    };
          
    let [isVisible, setIsVisible] = useState(false);          
    const handleErro = () => {
        setIsVisible(true);
    };
    const {idPeca} = useParams();
    const{nome} = useParams();
    const{preco} = useParams();
    const {idFabricante} = useParams();

    if(nomePeca === "")
        nomePeca = nome;
    
    if(prec === "")
        prec = Number(preco);
    
    if(idFab === "")
        idFab = Number(idFabricante);

    return (
        <div className="main-login">
            <section className="wrapper-cadastro">
                <div className="left-login">
                    <h1>Altere<br/> a peça</h1>
                </div>
                <div className="right-login">
                    <form className="card-login" onSubmit={alterar}>
                        <h1>ALTERAR</h1>
                        <div className="textfield">
                            <input type="number" name="idPeca" placeholder="Nome da Peça" value={idPeca}disabled/>
                        </div>
                        <div className="textfield">
                            <input type="text" name="nomePeca" placeholder="Nome da Peça" value={nomePeca} onChange={handleNomePeca}/>
                        </div>
                        <div className="textfield">
                            <input type="number" name="preco" placeholder="Preço unitário" value={prec} onChange={handlePreco}/>
                        </div>
                        <div className="textfield">
                            <input type="number" name="idFabricante" placeholder="ID do Fabricante" value={idFab} onChange={handleIdFabricante}/>
                        </div>
                        <p className={isVisible ? "visible" : "hidden"}>Preencha todos os dados corretamente!</p>
                        <input type="submit" className="btn-login" value="ALTERAR"/>
                    </form>
                </div>
            </section>
            <Footer link="/Home"/>
        </div>
    )
}

export default AlterarPeca;   

/**
CREATE TABLE peca (
  idPeca NUMBER DEFAULT SQ_PECA.NEXTVAL PRIMARY KEY,
  nomePeca VARCHAR2(50) NOT NULL,
  preco NUMBER,
  idFabricante NUMBER,
  CONSTRAINT fk_fabricante FOREIGN KEY (idFabricante) REFERENCES fabricante(idFabricante)
);
 */