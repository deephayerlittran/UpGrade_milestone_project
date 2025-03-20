import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ValidationError as JoiValidationError } from 'joi';

// ------------------------------------------------------------------
// Custom Error Classes 
// ------------------------------------------------------------------

interface CustomError extends Error {
    status?: number;
    errors?: { message: string }[];
}

export class AppError extends Error implements CustomError {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = "AppError";
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400);
        this.name = "ValidationError";
    }
}

export class AuthError extends AppError {
    constructor(message: string) {
        super(message, 401);
        this.name = "AuthError";
    }
}