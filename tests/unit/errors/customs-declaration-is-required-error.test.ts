import { describe, it, expect } from 'vitest';
import { CustomsDeclarationIsRequiredError } from '../../../src/errors/customs-declaration-is-required-error';
import { WBAPIError } from '../../../src/errors/base-error';

describe('CustomsDeclarationIsRequiredError', () => {
  describe('constructor', () => {
    it('should create error with all fields', () => {
      const response = {
        code: 'CustomsDeclarationIsRequired',
        message: 'Customs declaration is required',
        data: { orderIds: [123456] },
      };
      const error = new CustomsDeclarationIsRequiredError(
        'Customs declaration is required',
        'CustomsDeclarationIsRequired',
        response,
        'req-abc-123',
        's2s-api-marketplace',
        '2026-08-18T06:52:38Z'
      );

      expect(error.message).toBe('Customs declaration is required');
      expect(error.code).toBe('CustomsDeclarationIsRequired');
      expect(error.statusCode).toBe(409);
      expect(error.response).toEqual(response);
      expect(error.requestId).toBe('req-abc-123');
      expect(error.origin).toBe('s2s-api-marketplace');
      expect(error.timestamp).toBe('2026-08-18T06:52:38Z');
    });

    it('should create error with minimal required fields', () => {
      const error = new CustomsDeclarationIsRequiredError(
        'Customs declaration is required',
        'CustomsDeclarationIsRequired'
      );

      expect(error.message).toBe('Customs declaration is required');
      expect(error.code).toBe('CustomsDeclarationIsRequired');
      expect(error.statusCode).toBe(409);
      expect(error.response).toBeUndefined();
      expect(error.requestId).toBeUndefined();
    });

    it('should always set statusCode to 409', () => {
      const error = new CustomsDeclarationIsRequiredError('msg', 'CustomsDeclarationIsRequired');
      expect(error.statusCode).toBe(409);
    });

    it('should set name to CustomsDeclarationIsRequiredError', () => {
      const error = new CustomsDeclarationIsRequiredError('msg', 'CustomsDeclarationIsRequired');
      expect(error.name).toBe('CustomsDeclarationIsRequiredError');
    });
  });

  describe('inheritance', () => {
    it('should satisfy instanceof WBAPIError', () => {
      const error = new CustomsDeclarationIsRequiredError('msg', 'CustomsDeclarationIsRequired');
      expect(error).toBeInstanceOf(WBAPIError);
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('getUserMessage', () => {
    it('should include recovery guidance referencing setCustomsDeclaration', () => {
      const error = new CustomsDeclarationIsRequiredError(
        'Customs declaration is required',
        'CustomsDeclarationIsRequired'
      );

      const message = error.getUserMessage();
      expect(message).toContain('Customs declaration is required');
      expect(message).toContain('setCustomsDeclaration');
      expect(message).toContain('confirm');
      expect(message).toContain('Armenia');
    });
  });

  describe('toJSON', () => {
    it('should include code in serialized output', () => {
      const error = new CustomsDeclarationIsRequiredError(
        'Customs declaration is required',
        'CustomsDeclarationIsRequired',
        { code: 'CustomsDeclarationIsRequired', message: 'Customs declaration is required' },
        'req-1'
      );

      const json = error.toJSON();
      expect(json.name).toBe('CustomsDeclarationIsRequiredError');
      expect(json.message).toBe('Customs declaration is required');
      expect(json.statusCode).toBe(409);
      expect(json.code).toBe('CustomsDeclarationIsRequired');
      expect(json.requestId).toBe('req-1');
    });
  });
});
