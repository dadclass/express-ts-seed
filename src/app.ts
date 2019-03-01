import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import log from './logger/log-wrapper';
import controller from './controllers/controller.interface';
 
class App {
    private app: express.Application;
    private port: number;
    private readonly LOGGEE: string = path.basename(__filename);

    constructor(controllers: controller[], port: number) {
        this.app = express();
        this.port = port;
 
        this.initMiddlewares();
        this.initControllers(controllers);
    }
 
    private initMiddlewares() {
        this.app.use(bodyParser.json());
    }
 
    private initControllers(controllers: controller[]) {
        controllers.forEach((controller: controller) => {
            this.app.use('/api', controller.router);  // app root starts with 'api'
        });
    }
 
    public listen() {
        this.app.listen(this.port, () => {
            log.info(this.LOGGEE, `Listening to port ${this.port}`)
        });
    }

}
 
export default App;