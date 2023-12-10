import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../footer';
export function CadastrarPeca(){
    const navigate = useNavigate();
    async function fetchCadastrar(body){
        let token = localStorage.getItem('token');

        const requestOptions = {
            method: 'PUT',
            headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        };
        let resp 
        await (resp = fetch('http://localhost:3000/peca/inserirPecas', requestOptions).then(T => T.json()))
        return resp;
    }
    function cadastro(event){
        event.preventDefault();
        const nomePeca = event.target.nomePeca.value;
        const preco = event.target.preco.value;
        const idFabricante = event.target.idFabricante.value;
        if(nomePeca === undefined || preco === undefined || idFabricante === undefined){
            acusarInvalida();
            return;
        }
        else{
            fetchCadastrar({nomePeca:nomePeca, preco:preco, idFabricante:idFabricante}).then(customResponse=>{
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

    const [nomePeca, setNomePeca] = useState('');
    
    const handleNomePeca = (event) => {
        setNomePeca(event.target.value);
    };

    const [preco, setPreco] = useState('');
    
    const handlePreco = (event) => {
        setPreco(event.target.value);
    };
    const [idFabricante, setIdFabricante] = useState('');
    
    const handleIdFabricante = (event) => {
        setIdFabricante(event.target.value);
    };
          
    const [isVisible, setIsVisible] = useState(false);          
    const handleErro = () => {
        setIsVisible(true);
    };

    return (
        <div className="main-login">
            <section className="wrapper-cadastro">
                <div className="left-login">
                    <h1>Cadastro<br />de peças</h1>
                </div>
                <div className="right-login">
                    <form className="card-login" onSubmit={cadastro}>
                        <h1>CADASTRAR</h1>
                        <div className="textfield">
                            <input type="text" name="nomePeca" placeholder="Nome da Peça" value={nomePeca} onChange={handleNomePeca}/>
                        </div>
                        <div className="textfield">
                            <input type="number" name="preco" placeholder="Preço unitário" value={preco} onChange={handlePreco}/>
                        </div>
                        <div className="textfield">
                            <input type="number" name="idFabricante" placeholder="ID do Fabricante" value={idFabricante} onChange={handleIdFabricante}/>
                        </div>
                        <p className={isVisible ? "visible" : "hidden"}>Preencha todos os dados corretamente!</p>
                        <input type="submit" className="btn-login" value="Cadastrar"/>
                    </form>
                </div>
            </section>
            <Footer link="/Home"/>
        </div>
    )
}

export default CadastrarPeca;   

/**
CREATE TABLE peca (
  idPeca NUMBER DEFAULT SQ_PECA.NEXTVAL PRIMARY KEY,
  nomePeca VARCHAR2(50) NOT NULL,
  preco NUMBER,
  idFabricante NUMBER,
  CONSTRAINT fk_fabricante FOREIGN KEY (idFabricante) REFERENCES fabricante(idFabricante)
);
 */