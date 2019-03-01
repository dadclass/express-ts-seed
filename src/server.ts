import App from './app';
import BlogController from './controllers/blog.controller';

const PORT_NO: number = 3000;
const app = new App(
    [
        new BlogController(),
    ],
    PORT_NO,
);
 
app.listen();