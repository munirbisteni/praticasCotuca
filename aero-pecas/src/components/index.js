import { Link } from "react-router-dom";

export function Index(){
    return (
        <div className="main-login">
            <section className="left-option">
                <div className="wrapper-option">
                    <Link to="/CadastrarPeca" className="option-index">
                        <h1>Cadastrar peça</h1>
                    </Link>
                    <Link to="/ListarPeca" className="option-index">
                        <h1>Listar peças</h1>
                    </Link>
                </div>
            </section>
            <section className="right-option">      
                    <div className="wrapper-option">
                        <Link to="/CadastrarFabricante" className="option-index">
                            <h1>Cadastrar fabricante</h1>
                        </Link>
                        <Link to="/ListarFabricante" className="option-index">
                            <h1>Listar fabricantes</h1>
                        </Link>
                    </div>
            </section>
        </div>
    )
}

export default Index;