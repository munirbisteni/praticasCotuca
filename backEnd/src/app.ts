// MUNIR BISTENI 23328
// ANDREW NITHACK 23305
// THIAGO TEDESCHI 23335

import express from "express";
import cors from "cors";

import usuarioRotes from "./routes/usuarioRotes"
import pecasRoutes from "./routes/pecasRoutes"
import fabricanteRoutes from "./routes/fabricantesRoutes"
const app  = express();
const port =      3000;

app.use(express.json());
app.use(cors());

app.use("/usuario", usuarioRotes);
app.use("/peca", pecasRoutes);
app.use("/fabricante", fabricanteRoutes);

app.listen(port, ()=>{
    console.log("HTTP SERVER STARTED ON localhost:" + port );
});

