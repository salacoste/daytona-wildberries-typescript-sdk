import { describe, it, expect } from 'vitest';
import { ValidationError } from '../../../src/errors/validation-error';
import { WBAPIError } from '../../../src/errors/base-error';

describe('ValidationError', () => {
  describe('constructor', () => {
    it('should create error with default message and statusCode 400', () => {
      const error = new ValidationError();

      expect(error.message).toBe('Validation failed. Please check the request data and try again.');
      expect(error.statusCode).toBe(400);
      expect(error.fieldErrors).toBeUndefined();
      expect(error.response).toBeUndefined();
      expect(error.requestId).toBeUndefined();
    });

    it('should create error with custom message', () => {
      const error = new ValidationError('Custom validation error');

      expect(error.message).toBe('Custom validation error');
      expect(error.statusCode).toBe(400);
    });

    it('should create error with field errors', () => {
      const fieldErrors = {
        brandName: 'Brand name is required',
        price: 'Price must be a positive number',
      };
      const error = new ValidationError(undefined, fieldErrors);

      expect(error.fieldErrors).toEqual(fieldErrors);
    });

    it('should create error with statusCode 400', () => {
      const error = new ValidationError('Bad request', undefined, 400);

      expect(error.statusCode).toBe(400);
    });

    it('should create error with statusCode 422', () => {
      const error = new ValidationError('Unprocessable entity', undefined, 422);

      expect(error.statusCode).toBe(422);
    });

    it('should create error with all parameters', () => {
      const fieldErrors = { email: 'Invalid format' };
      const response = { error: 'validation_failed' };
      const error = new ValidationError('Validation failed', fieldErrors, 422, response, 'req-abc');

      expect(error.message).toBe('Validation failed');
      expect(error.fieldErrors).toEqual(fieldErrors);
      expect(error.statusCode).toBe(422);
      expect(error.response).toEqual(response);
      expect(error.requestId).toBe('req-abc');
    });
  });

  describe('inheritance', () => {
    it('should extend WBAPIError', () => {
      const error = new ValidationError();
      expect(error).toBeInstanceOf(WBAPIError);
    });

    it('should extend Error', () => {
      const error = new ValidationError();
      expect(error).toBeInstanceOf(Error);
    });

    it('should be instanceof ValidationError', () => {
      const error = new ValidationError();
      expect(error).toBeInstanceOf(ValidationError);
    });
  });

  describe('name property', () => {
    it('should set name to ValidationError', () => {
      const error = new ValidationError();
      expect(error.name).toBe('ValidationError');
    });
  });

  describe('fieldErrors property', () => {
    it('should be undefined when not provided', () => {
      const error = new ValidationError();
      expect(error.fieldErrors).toBeUndefined();
    });

    it('should store single field error', () => {
      const fieldErrors = { email: 'Invalid email format' };
      const error = new ValidationError(undefined, fieldErrors);

      expect(error.fieldErrors).toEqual(fieldErrors);
    });

    it('should store multiple field errors', () => {
      const fieldErrors = {
        brandName: 'Brand name is required',
        price: 'Price must be greater than 0',
        categoryId: 'Invalid category ID',
      };
      const error = new ValidationError(undefined, fieldErrors);

      expect(error.fieldErrors).toEqual(fieldErrors);
      expect(Object.keys(error.fieldErrors ?? {}).length).toBe(3);
    });

    it('should be readonly', () => {
      const fieldErrors = { field: 'error' };
      const error = new ValidationError(undefined, fieldErrors);

      // TypeScript enforces readonly at compile time
      expect(error.fieldErrors).toEqual(fieldErrors);
    });

    it('should handle empty fieldErrors object', () => {
      const error = new ValidationError(undefined, {});

      expect(error.fieldErrors).toEqual({});
      expect(Object.keys(error.fieldErrors ?? {}).length).toBe(0);
    });
  });

  describe('getUserMessage()', () => {
    it('should include general guidance when no field errors', () => {
      const error = new ValidationError('Validation failed', undefined, 400);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Validation failed (Status: 400)');
      expect(userMessage).toContain('To resolve this issue:');
      expect(userMessage).toContain('Ensure all required fields are provided');
      expect(userMessage).toContain('Verify that field values meet the API specifications');
      expect(userMessage).toContain('Check that data types and formats are correct');
      expect(userMessage).toContain('Review the API documentation');
    });

    it('should include field-level errors when provided', () => {
      const fieldErrors = {
        brandName: 'Brand name is required',
        price: 'Price must be positive',
      };
      const error = new ValidationError('Validation failed', fieldErrors);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Field validation errors:');
      expect(userMessage).toContain('- brandName: Brand name is required');
      expect(userMessage).toContain('- price: Price must be positive');
      expect(userMessage).toContain('Please correct the above fields and try again.');
    });

    it('should not include general guidance when field errors exist', () => {
      const fieldErrors = { email: 'Invalid format' };
      const error = new ValidationError(undefined, fieldErrors);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('Field validation errors:');
      expect(userMessage).not.toContain('Ensure all required fields are provided');
    });

    it('should handle empty fieldErrors object', () => {
      const error = new ValidationError(undefined, {});
      const userMessage = error.getUserMessage();

      // Empty object should use general guidance
      expect(userMessage).toContain('To resolve this issue:');
      expect(userMessage).toContain('Ensure all required fields are provided');
    });

    it('should format multiple field errors correctly', () => {
      const fieldErrors = {
        name: 'Name is required',
        email: 'Invalid email',
        phone: 'Invalid phone number',
      };
      const error = new ValidationError(undefined, fieldErrors);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('- name: Name is required');
      expect(userMessage).toContain('- email: Invalid email');
      expect(userMessage).toContain('- phone: Invalid phone number');
    });
  });

  describe('serialization', () => {
    it('should serialize to JSON preserving properties', () => {
      const fieldErrors = { email: 'Invalid format' };
      const error = new ValidationError(
        'Validation failed',
        fieldErrors,
        422,
        { code: 'ERR' },
        'req-123'
      );
      const json = JSON.stringify(error);
      const parsed = JSON.parse(json) as {
        message: string;
        name: string;
        statusCode: number;
        fieldErrors: typeof fieldErrors;
        response: { code: string };
        requestId: string;
      };

      expect(parsed.message).toBe('Validation failed');
      expect(parsed.name).toBe('ValidationError');
      expect(parsed.statusCode).toBe(422);
      expect(parsed.fieldErrors).toEqual(fieldErrors);
      expect(parsed.response).toEqual({ code: 'ERR' });
      expect(parsed.requestId).toBe('req-123');
    });
  });

  describe('error scenarios', () => {
    it('should represent missing required fields', () => {
      const fieldErrors = {
        brandName: 'Brand name is required',
        categoryId: 'Category ID is required',
      };
      const error = new ValidationError('Missing required fields', fieldErrors, 400);

      expect(error.getUserMessage()).toContain('brandName: Brand name is required');
      expect(error.getUserMessage()).toContain('categoryId: Category ID is required');
    });

    it('should represent invalid data types', () => {
      const fieldErrors = {
        price: 'Price must be a number',
        quantity: 'Quantity must be an integer',
      };
      const error = new ValidationError('Invalid data types', fieldErrors, 400);

      expect(error.getUserMessage()).toContain('price: Price must be a number');
      expect(error.getUserMessage()).toContain('quantity: Quantity must be an integer');
    });

    it('should represent format validation errors', () => {
      const fieldErrors = {
        email: 'Invalid email format',
        phone: 'Phone must match pattern +X-XXX-XXX-XXXX',
        url: 'Must be a valid URL',
      };
      const error = new ValidationError('Format validation failed', fieldErrors, 422);

      expect(error.statusCode).toBe(422);
      expect(Object.keys(error.fieldErrors ?? {}).length).toBe(3);
    });

    it('should represent business rule violations', () => {
      const fieldErrors = {
        price: 'Price must be greater than cost',
        endDate: 'End date must be after start date',
      };
      const error = new ValidationError('Business rule violation', fieldErrors, 422);

      expect(error.getUserMessage()).toContain('price: Price must be greater than cost');
      expect(error.getUserMessage()).toContain('endDate: End date must be after start date');
    });

    it('should handle general validation without specific fields', () => {
      const error = new ValidationError('Request body is malformed', undefined, 400);

      expect(error.fieldErrors).toBeUndefined();
      expect(error.getUserMessage()).toContain('To resolve this issue:');
    });
  });

  describe('field error formatting', () => {
    it('should format field errors with proper indentation', () => {
      const fieldErrors = {
        field1: 'Error 1',
        field2: 'Error 2',
      };
      const error = new ValidationError(undefined, fieldErrors);
      const userMessage = error.getUserMessage();

      // Check that each error line starts with proper indentation
      expect(userMessage).toContain('  - field1: Error 1');
      expect(userMessage).toContain('  - field2: Error 2');
    });

    it('should handle special characters in field names', () => {
      const fieldErrors = {
        'user.email': 'Invalid email',
        'profile[0].name': 'Name required',
      };
      const error = new ValidationError(undefined, fieldErrors);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain('user.email: Invalid email');
      expect(userMessage).toContain('profile[0].name: Name required');
    });

    it('should handle long error messages', () => {
      const longMessage =
        'This is a very long error message that describes in detail what went wrong with the validation';
      const fieldErrors = { field: longMessage };
      const error = new ValidationError(undefined, fieldErrors);
      const userMessage = error.getUserMessage();

      expect(userMessage).toContain(`field: ${longMessage}`);
    });
  });
});
