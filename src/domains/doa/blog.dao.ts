import path from 'path';
import fs from 'fs';
import log from '../../logger/log-wrapper';
import { Blog } from '../blog.model';

export class BlogDao {
    private static readonly LOGGEE: string = path.basename(__filename);
    private static blogs:Blog[]  = [];

    static loadJsonSync(JsonPath: string): void {
        log.debug(this.LOGGEE, `Loading Blogs from JSON file`);
        if (fs.existsSync(JsonPath)) {
            const data = fs.readFileSync(JsonPath);
            log.debug(this.LOGGEE, `JSON data from ${JsonPath} read`);

            const arrObjs = JSON.parse(data.toString());  // JSON.parse() deserialized into objects of type 'any'
            for (let i = 0; i < arrObjs.length; i++) {
                const emptyBlog = new Blog("", "", []);
                BlogDao.blogs[i] = Object.assign(emptyBlog, arrObjs[i]);  // casting deserialized objects into blogs
                log.debug(this.LOGGEE, `Blog: ${BlogDao.blogs[i].getId()}: ${BlogDao.blogs[i].getTitle()} loaded`);
            }
            log.debug(BlogDao.LOGGEE, `${BlogDao.blogs.length} blogs are loaded`);
        } else {
            log.debug(BlogDao.LOGGEE, `${JsonPath} does not exist`);
        }
    }

    static readBlogs(): Blog[] {
        return BlogDao.blogs;
    }

    static readBlog(idStr: string): Blog | undefined {
        return this.blogs.find(blog => blog.getId() === parseInt(idStr));
    }
}