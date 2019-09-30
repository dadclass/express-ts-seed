import express from 'express';
import path from 'path';

import log from '../logger/log-wrapper';

import { Blog } from '../domains/blog.model';

export class BlogController {
    private readonly LOGGEE: string = path.basename(__filename);
    private readonly GET_ALL_BLOGS_PAGE_TITLE = "All Movies Reviewed"

    private isJsonRequest(contentType: string): boolean {
        return (contentType === 'application/json')? true : false;
    }
    
    getAllBlogs = (req: express.Request, res: express.Response) => {
        log.debug(this.LOGGEE, `GET-ting all blogs ...`)
        if (req.header('Content-Type') === 'application/json') {
            log.debug(this.LOGGEE, 'Responding in JSON');
            res.json(Blog.getAllBlogs());
        } else {  // return webpage for non JSON requests
            log.debug(this.LOGGEE, 'Responding in webpage');
            res.render("bloglist", {
                pageTitle: this.GET_ALL_BLOGS_PAGE_TITLE,
                canCreate: true,
                canEdit: false,
                canDelete: false,
                blogs: Blog.getAllBlogs()});
        }
    }

    getBlog = (req: express.Request, res: express.Response) => {
        const blogId:string = req.params.blogId;
        log.debug(this.LOGGEE, `GET-ting blog ${blogId} ...`);
        const blog: any = Blog.getBlog(blogId);  // blog can be undefined if its ID not found
        if (blog === undefined && req.header('Content-Type') === 'application/json') {
            log.debug(this.LOGGEE, 'Responding in JSON');
            log.error(this.LOGGEE, `Blog ID ${blogId} doesn't exist`);
            res.json({Error: `Blog ID ${blogId} doesn't exist`});
            return;
        }
        if (blog === undefined && req.header('Content-Type') !== 'application/json') {
            log.debug(this.LOGGEE, 'Responding in HTML');
            log.error(this.LOGGEE, `Blog ID ${blogId} doesn't exist, redirecting to /`);
            res.redirect('/');
            return;
        }
        if (req.header('Content-Type') === 'application/json') {
            log.debug(this.LOGGEE, 'Responding in JSON');
            res.json(blog);
        } else {  // return webpage for non JSON requests
            log.debug(this.LOGGEE, 'Responding in HTML');
            res.render("blogdetail", {
                pageTitle: blog.title,
                canCreate: false,
                canEdit: true,
                canDelete: true,
                blog: blog});
        }
    }

    createABlog = (req: express.Request, res: express.Response) => {
        const blog: Blog = new Blog(
            req.body.title,
            req.body.content,
            req.body.imageUrls
        );
        blog.addBlog();
        log.debug(this.LOGGEE, `Blog: ${blog.getTitle()} created`)
        if (req.header('Content-Type') === 'application/json') {
            res.json(blog);
        } else {
            res.send("<div>" + blog + "</div>");
        }
    }
}