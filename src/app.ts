import './config/index'
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as router from './routes/routes';
import * as mysql from 'mysql';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import * as cookieParser from 'cookie-parser';
import { Server } from 'http';
dotenv.config();
class App {
    public app: express.Application;
    private route : express.Router;
    constructor(){
        this.app = express();
        this.route = router.default.getRouter();
        this.initializeMiddlewares();
    }

    private initializeMiddlewares(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false}));
        this.app.use(cookieParser());
        this.app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use('/',this.route);
    }
    public listen():void{
        const instance: Server = this.app.listen(
            process.env.PORT, ()=>{
                console.log(`server is running on at ${process.env.PORT}`);
            }
        );
    }

    public getServer(): express.Application {
        return this.app;
    }

}

const app = new App()
app.listen();