import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { errorHandler, AppError, ValidationError, AuthError } from '../src/api/v1/middleware/errorHandler';
import { ValidationError as JoiValidationError } from 'joi';

const app = express();
app.use(express.json());

// Simulate routes that throw different types of errors
app.get('/validation-error', (req, res, next) => {
    next(new ValidationError('Invalid input data'));
});

app.get('/auth-error', (req, res, next) => {
    next(new AuthError('Authentication required'));
});

app.get('/app-error', (req, res, next) => {
    next(new AppError('Something went wrong in the application', 503));
});

app.get('/joi-validation-error', (req, res, next) => {
    const joiError = new JoiValidationError('"name" is required', [{
        message: '"name" is required',
        path: ['name'],
        type: 'any.required',
        context: { key: 'name', label: 'name' }
    }], undefined);
    next(joiError);
});

app.get('/generic-error', (req, res, next) => {
    next(new Error('A generic server error occurred'));
});

app.get('/unknown-error', (req, res, next) => {
    next("This is not an Error object");
});

// Apply the error handling middleware to the app
app.use(errorHandler);

describe('Error Handling Middleware Tests', () => {
    test('should handle ValidationError and return 400 status with error message', async () => {
        const response = await request(app).get('/validation-error');
        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual([{ message: 'Invalid input data' }]);
    });

    test('should handle AuthError and return 401 status with error message', async () => {
        const response = await request(app).get('/auth-error');
        expect(response.status).toBe(401);
        expect(response.body.errors).toEqual([{ message: 'Authentication required' }]);
    });

    test('should handle AppError and return custom status code and error message', async () => {
        const response = await request(app).get('/app-error');
        expect(response.status).toBe(503);
        expect(response.body.errors).toEqual([{ message: 'Something went wrong in the application' }]);
    });

    test('should handle JoiValidationError and return 400 status with Joi error details', async () => {
        const response = await request(app).get('/joi-validation-error');
        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual([{ message: '"name" is required' }]);
    });

    test('should handle generic Error and return 500 status with default message', async () => {
        const response = await request(app).get('/generic-error');
        expect(response.status).toBe(500);
        expect(response.body.errors).toEqual([{ message: 'Internal Server Error' }]);
    });

    test('should handle unknown error type and return 500 status with default message for unknown errors', async () => {
        const response = await request(app).get('/unknown-error');
        expect(response.status).toBe(500);
        expect(response.body.errors).toEqual([{ message: 'An unexpected error occurred' }]);
    });
});