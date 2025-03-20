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

// ------------------------------------------------------------------
// Error Handling Middleware Function
// ------------------------------------------------------------------

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("ERROR HANDLER MIDDLEWARE TRIGGERED:", err);

    if (err instanceof JoiValidationError) {
        const validationErrors = err.details.map(detail => ({ message: detail.message }));
        res.status(400).json({ errors: validationErrors }); 
    } else if (err instanceof ValidationError) {
        res.status(400).json({ errors: [{ message: err.message }] }); 
    } else if (err instanceof AuthError) {
        res.status(401).json({ errors: [{ message: err.message }] }); 
    } else if (err instanceof AppError) {
        res.status(err.status || 500).json({ errors: [{ message: err.message }] }); 
    } else if (err instanceof Error) {
        res.status(500).json({ errors: [{ message: "Internal Server Error" }] }); 
    } else {
        res.status(500).json({ errors: [{ message: "An unexpected error occurred" }] }); 
    }
};