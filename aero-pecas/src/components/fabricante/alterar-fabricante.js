import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../footer';
import { useParams } from 'react-router-dom';

export function AlterarFabricante(){
    const navigate = useNavigate();
    async function fetchAlterar(body){
        let token = localStorage.getItem('token');
        const requestOptions = {
            method: 'PUT',
            headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        };
        let resp 
        await (resp = fetch('http://localhost:3000/fabricante/alterarFabricantes', requestOptions).then(T => T.json()))
        return resp;
    }
    function alterar(event){
        event.preventDefault();
        const nomeFabricante = event.target.nomeFabricante.value;
        const idFabricante = event.target.idFabricante.value;

        if(nomeFabricante === ""){
            acusarInvalida();
            return;
        }
        else{
            fetchAlterar({nomeFabricante:nomeFabricante, idFabricante:idFabricante}).then(customResponse=>{
                console.log(customResponse)
                if(customResponse.status === "SUCCESS"){
                        navigate("/ListarFabricante")
                    
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

    let [nomeFabricante, setNomeFabricante] = useState('');
    
    const handleFabricante = (event) => {
        setNomeFabricante(event.target.value);
    };
          
    const [isVisible, setIsVisible] = useState(false);          
    const handleErro = () => {
        setIsVisible(true);
    };
    const {id} = useParams();
    const{nome} = useParams();
    if(nomeFabricante === ""){
        nomeFabricante = nome;
    }
    return (
        <div className="main-login">
            <section className="wrapper-cadastro">
                <div className="left-login">
                    <h1>Alterar<br />fabricante</h1>
                </div>
                <div className="right-login">
                    <form className="card-login" onSubmit={alterar}>
                        <h1>ALTERAR</h1>
                        <div className="textfield">
                            <input type="text" name="idFabricante" placeholder="ID do Fabricante" value={id} disabled/>
                        </div>
                        <div className="textfield">
                            <input type="text" name="nomeFabricante" placeholder="Nome do Fabricante" value={nomeFabricante} onChange={handleFabricante}/>
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

export default AlterarFabricante;   

/**
CREATE TABLE peca (
  idPeca NUMBER DEFAULT SQ_PECA.NEXTVAL PRIMARY KEY,
  nomePeca VARCHAR2(50) NOT NULL,
  preco NUMBER,
  idFabricante NUMBER,
  CONSTRAINT fk_fabricante FOREIGN KEY (idFabricante) REFERENCES fabricante(idFabricante)
);
 */