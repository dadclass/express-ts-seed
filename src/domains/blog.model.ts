import path from 'path';
import log from '../logger/log-wrapper';
import { BlogDao } from './doa/blog.dao';

export class Blog {
    private static readonly LOGGEE: string = path.basename(__filename);
    private static idCount: number = 1;
    private id: number;
    private createdOn: Date;

    constructor(
        private title: string,
        private content: string,
        private imageUrls: string[]
    ) { 
        this.id = Blog.idCount++;
        this.createdOn = new Date();
    }

    static loadSampleData(filePath: string): void {
        log.debug(this.LOGGEE, `Loading sample data`);
        BlogDao.loadJsonSync(filePath);
    }

    static getAllBlogs(): Blog[] {
        return BlogDao.readBlogs();
    }

    static getBlog(blogId: string): Blog | undefined {
        return BlogDao.readBlog(blogId);
    }

    addBlog() {
        BlogDao.readBlogs().push(this);
    }

    getTitle(): string {
        return this.title;
    }

    getId(): number {
        return this.id;
    }

    getCreatedOnFormatted(): string {
        let format = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};
        return this.createdOn.toLocaleDateString("en-us", format);
    }

    toFormattedString(): string {
        return "Created On: " + this.getCreatedOnFormatted() + "\n" +
                `Title: ${this.title}\n` +
                `Content: ${this.content}\n`+
                `Image 1: ${this.imageUrls[0]}\n`+
                `Image 2: ${this.imageUrls[1]}`;
    }
}
