import express from 'express';
import Controller from './controller.interface';
import Blog from '../domain/blog.model';
 
class BlogController implements Controller {
    public path = '/blogs';
    public router = express.Router();
 
    private blogs: Blog[] = [];
 
    constructor() {
        this.initRoutes();
    }
 
    public initRoutes() {
        this.router.get(this.path, this.getAllBlogs);
        this.router.post(this.path, this.createABlog);
    }
 
    getAllBlogs = (request: express.Request, response: express.Response) => {
        response.send(this.blogs);
    }
 
    createABlog = (request: express.Request, response: express.Response) => {
        const blog: Blog = new Blog(
            new Date(request.body.createdOn),
            request.body.title,
            request.body.content,
            request.body.imageUrls
        );
        this.blogs.push(blog);
        response.send(blog);
    }
}
 
export default BlogController;