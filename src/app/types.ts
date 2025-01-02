/**
 * Represents a todo item in the application
 */
export interface Todo {
  readonly id: number;
  title: string;
  description?: string;
  done: boolean;
  readonly createdAt?: string;
  updatedAt?: string;
}

/**
 * Represents the data required to create a new todo
 */
export type CreateTodoDto = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Represents the data that can be updated on a todo
 */
export type UpdateTodoDto = Partial<CreateTodoDto>;

/**
 * Represents validation errors from the API
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Represents the structure of API error responses
 */
export interface ApiErrorResponse {
  message: string;
  code: string;
  errors?: ValidationError[];
  timestamp?: string;
  path?: string;
}

/**
 * Represents the structure of successful API responses
 */
export interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

/**
 * Represents the possible states of an API request
 */
export type RequestState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Type guard to check if an error is an API error response
 */
export function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'code' in error
  );
}
