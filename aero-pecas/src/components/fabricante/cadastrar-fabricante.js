import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../footer';
export function CadastrarFabricante(){
    const navigate = useNavigate();
    async function fetchCadastrar(body){
        let token = localStorage.getItem('token');
        const requestOptions = {
            method: 'PUT',
            headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        };
        let resp 
        await (resp = fetch('http://localhost:3000/fabricante/inserirFabricantes', requestOptions).then(T => T.json()))
        return resp;
    }
    function cadastro(event){
        event.preventDefault();
        const nomeFabricante = event.target.nomeFabricante.value;
        console.log(nomeFabricante)
        if(nomeFabricante === undefined){
            acusarInvalida();
            return;
        }
        else{
            fetchCadastrar({nomeFabricante:nomeFabricante}).then(customResponse=>{
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

    const [nomeFabricante, setNomeFabricante] = useState('');
    
    const handleFabricante = (event) => {
        setNomeFabricante(event.target.value);
    };
          
    const [isVisible, setIsVisible] = useState(false);          
    const handleErro = () => {
        setIsVisible(true);
    };

    return (
        <div className="main-login">
            <section className="wrapper-cadastro">
                <div className="left-login">
                    <h1>Cadastro<br />fabricantes</h1>
                </div>
                <div className="right-login">
                    <form className="card-login" onSubmit={cadastro}>
                        <h1>CADASTRAR</h1>
                        <div className="textfield">
                            <input type="text" name="nomeFabricante" placeholder="Nome do Fabricante" value={nomeFabricante} onChange={handleFabricante}/>
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

export default CadastrarFabricante;   

/**
CREATE TABLE peca (
  idPeca NUMBER DEFAULT SQ_PECA.NEXTVAL PRIMARY KEY,
  nomePeca VARCHAR2(50) NOT NULL,
  preco NUMBER,
  idFabricante NUMBER,
  CONSTRAINT fk_fabricante FOREIGN KEY (idFabricante) REFERENCES fabricante(idFabricante)
);
 */