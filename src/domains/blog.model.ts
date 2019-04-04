import path from 'path';
import fs from 'fs';
import log from '../logger/log-wrapper';

export class Blog {
    private static readonly LOGGEE: string = path.basename(__filename);
    private static readonly DATA_FILE: string = 'blogs.data.ts';
    private static readonly DATA_FILE_PATH: string = path.join(__dirname, Blog.DATA_FILE);
    private static blogs:Blog[]  = [];

    private createdOn: Date;

    constructor(
        private title: string,
        private content: string,
        private imageUrls: string[]
    ) { 
        this.createdOn = new Date();
    }

    static loadSampleData(): void {
        log.debug(this.LOGGEE, `Loading sample data`);
        if (fs.existsSync(Blog.DATA_FILE_PATH)) {
            const data = fs.readFileSync(Blog.DATA_FILE_PATH);
            log.debug(this.LOGGEE, `Blogs data from ${Blog.DATA_FILE} read`);

            const arrObjs = JSON.parse(data.toString());  // JSON.parse() deserialized into objects of type 'any'
            for (let i = 0; i < arrObjs.length; i++) {
                const emptyBlog = new Blog("", "", []);
                Blog.blogs[i] = Object.assign(emptyBlog, arrObjs[i]);  // casting deserialized objects into blogs
                log.debug(this.LOGGEE, `Blog: ${Blog.blogs[i].toFormattedString()}`);
            }

            log.debug(Blog.LOGGEE, `${Blog.blogs.length} blogs are loaded`);
        } else {
            log.debug(Blog.LOGGEE, `${Blog.DATA_FILE_PATH} does not exist`);
        }
    }

    toFormattedString(): string {
        return "Created On: " + this.getCreatedOnFormatted() + "\n" +
                `Title: ${this.title}\n` +
                `Content: ${this.content}\n`+
                `Image 1: ${this.imageUrls[0]}\n`+
                `Image 2: ${this.imageUrls[1]}`;
    }

    static readAllBlogs(): Blog[] {
        return Blog.blogs;
    }

    addBlog() {
        Blog.blogs.push(this);
    }

    getTitle(): string {
        return this.title;
    }

    getCreatedOnFormatted(): string {
        let format = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};
        return this.createdOn.toLocaleDateString("en-us", format);
    }

    static getFirstBlog() {
        return Blog.blogs[0];
    }
}
