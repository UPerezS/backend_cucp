import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import usuariosRoutes from './routes/usuariosRoutes';

class Server {
    private app: Application;

    //Inicializa la clase
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.app.listen(this.app.get("port"), () => {
            console.log("Server on port", this.app.get("port"));
        });
    }

    //Configuracion de modulos
    config(): void {
        this.app.set("port", 3000);
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false, }));
    }

    //Configura las rutas
    routes() {
        this.app.use("/", authRoutes);
        this.app.use("/usuarios", usuariosRoutes);
    }
}

const server = new Server();