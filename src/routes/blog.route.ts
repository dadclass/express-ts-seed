import express from 'express';
import path from 'path';
import log from '../logger/log-wrapper';
import { Route } from './route.interface';
import { BlogController } from '../controllers/blog.controller';

export class BlogRoute implements Route {
    private readonly LOGGEE: string = path.basename(__filename);
    private router: express.Router;
    private blogCtlr: BlogController = new BlogController();
 
    constructor(private rootPath: string) {
        log.debug(this.LOGGEE, `Creating route for ${rootPath}`);
        this.router = express.Router();
        this.initRoutes();
    }
    
    private initRoutes() {
        this.router.get("/", this.blogCtlr.getAllBlogs);
        log.debug(this.LOGGEE, `Defined GET / path to retrieve all the blogs`);
        this.router.post("/", this.blogCtlr.createABlog);
        log.debug(this.LOGGEE, `Defined POST / path to create a new blog`);
        this.router.get("/:blogId", this.blogCtlr.getBlog);
        log.debug(this.LOGGEE, `Defined GET /:prodId path to retrieve a blog`);
    }

    getRootPath(): string {
        return this.rootPath;
    }

    getRouter(): express.Router {
        return this.router;
    } 
}