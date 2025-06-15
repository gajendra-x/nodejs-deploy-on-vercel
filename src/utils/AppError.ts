export class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: string;
  public readonly code?: string;
  // biome-ignore lint:
  public readonly details?: any;
  // public readonly isOperational: boolean; // Uncomment if you need this property

  // biome-ignore lint:
  constructor(error: any, statusCode?: number) {
    if (typeof error === 'object' && error !== null) {
      super(error.message);

      console.log('ERROR NAME', error.name);
      console.log('ERROR CODE', error.code);

      this.name = error.name || 'Error';
      this.code = error.code;
      this.statusCode = statusCode || 500;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.details = { ...error };
      // this.isOperational = true; // Uncomment if we need this property
    } else {
      super(error);

      this.statusCode = statusCode || 500;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.name = 'ApiError';
      this.details = error;
      // this.isOperational = true; // Uncomment if we need this property
    }

    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture the stack trace if available
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
