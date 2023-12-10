import React, {useState} from "react";
import "../assets/styles/styles.css"
import { useNavigate } from "react-router-dom";
export function Login(){
    const navigate = useNavigate();
    async function fetchValidarLogin(body){
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        let resp 
        await (resp = fetch('http://localhost:3000/usuario/validarUsuario', requestOptions).then(T => T.json()))
        return resp;
}

    function login(event){
        event.preventDefault();
        const lgn = event.target.usuario.value;
        const senha = event.target.senha.value;
        fetchValidarLogin({lgn:lgn, senha:senha}).then(customResponse=>{
            console.log(customResponse)
            if(customResponse.status === "SUCCESS"){
                if(customResponse.payload === 1){
                    localStorage.setItem('token', String(customResponse.message));
                    navigate("/Home")
                }
            else{
                acusarInvalida();
            }
        }
        else{
            throw new Error("erro desconhecido")
        }
        }).catch(e =>{
            acusarInvalida();
        })
    }



    function acusarInvalida(){
        handleErro(true);
    }

    const [senha, setSenha] = useState('');
    
    const handleSenha = (event) => {
        setSenha(event.target.value);
    };
      
    const [usuario, setUsuario] = useState('');
    
    const handleUsuario = (event) => {
        setUsuario(event.target.value);
      };
      
    const handleErro = () => {
        setIsVisible(true);
    };

    const [isVisible, setIsVisible] = useState(false);

    return(
        <div className="main-login">
            <div className="left-login">
                <h1>Faça login <br/>AeroPeças</h1>
            </div>
            <div className="right-login">
                <form className="card-login" onSubmit={login}>
                    <h1>LOGIN</h1>
                    <div className="textfield">
                        <input type="number" name="usuario" placeholder="Usuário" value={usuario} onChange={handleUsuario}/>
                    </div>
                    <div className="textfield">
                        <input type="password" name="senha" placeholder="Senha" value={senha} onChange={handleSenha}/>
                    </div>
                    <p className={isVisible ? "visible" : "hidden"}>Usuário e/ou senha inválido!</p>
                    <input type="submit" className="btn-login"/>
                </form>
            </div>
        </div>
    )
}

export default Login;