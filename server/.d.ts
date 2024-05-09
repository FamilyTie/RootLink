import { Request, Response, NextFunction } from 'express';
import session from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    // Define your session properties here
    userId?: number;  // Example property
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
  }
}