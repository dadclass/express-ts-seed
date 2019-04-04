import express from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import log from './logger/log-wrapper';
import { BlogRoute } from './routes/blog.route';
import { Blog } from './domains/blog.model';
 
export class BlogApp {
    private app: express.Application;
    private readonly LOGGEE: string = path.basename(__filename);

    constructor(routes: BlogRoute[]) {
        this.app = express();

        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, 'views'));
 
        this.initMiddlewares();
        this.initRoutes(routes);

        Blog.loadSampleData();
    }
 
    private initMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(express.static(path.join(__dirname, 'public')));
        log.debug(this.LOGGEE, `Application middlewares initialized`);
    }
 
    private initRoutes(routes: BlogRoute[]) {
        routes.forEach((route: BlogRoute) => {
            this.app.use(route.getRootPath(), route.getRouter());
            log.debug(this.LOGGEE, `${route.getRootPath()} route created`);
        });
        //TODO: add catch-all route to landing page
    }
 
    listen(port: string) {
        this.app.listen(port, () => {
            log.info(this.LOGGEE, `Listening to port ${port}`)
        });
    }
}