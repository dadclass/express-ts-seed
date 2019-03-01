import express from 'express';

interface Controller {
    router: express.Router;
    initRoutes(): void;
}

export default Controller;