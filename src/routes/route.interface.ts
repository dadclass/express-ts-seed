import express from 'express';

export interface Route {

    getRootPath(): string;

    getRouter(): express.Router;
}