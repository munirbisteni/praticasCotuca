import React from 'react';
import { Link } from "react-router-dom";
function Footer(props) {

    return (
        <footer id="footer">
            <Link className="button-back" to={props.link} >Voltar</Link>
        </footer>
    );  
}

export default Footer;