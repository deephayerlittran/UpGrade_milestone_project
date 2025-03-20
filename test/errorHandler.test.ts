import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { errorHandler, AppError, ValidationError, AuthError } from '../src/api/v1/middleware/errorHandler.middleware';
import { ValidationError as JoiValidationError } from 'joi';

const app = express();
app.use(express.json());