import path from 'path';
import log from './logger/log-wrapper';

import { BlogApp } from './blog-app';
import { BlogRoute } from './routes/blog.route';

const LOGGEE: string = path.basename(__filename);
const PORT_NO: string = process.env.EXPRESS_PORT || "3000";

log.debug(LOGGEE, 'Server is starting')
log.debug(LOGGEE, `Creating Blog App`);
const blogApp = new BlogApp(
    [
        new BlogRoute("/blogs")
       //TODO: construct app with defined route(s), add more routes here if necessary
    ]
);
 
blogApp.listen(PORT_NO);
log.debug(LOGGEE, `Server started`);