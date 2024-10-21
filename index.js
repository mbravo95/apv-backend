import express from "express";
import conectarDB from "./config/db.js";
import dotenv from 'dotenv';
import cors from 'cors';
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();
/*
const dominiosPermitidos = [process.env.FRONTEND_URL, 'http://172.30.3.31'];

const corsOptions = {
    origin: function(origin, callback){
        callback(null, true);
    }
}

app.use(cors(corsOptions));
*/

app.use("/api/veterinarios", veterinarioRoutes);

app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
