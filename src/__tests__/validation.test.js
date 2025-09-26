import { describe, it, expect } from 'vitest';
import { validateProject, hasErrors } from '../utils/validation.js';

describe('validation', () => {
  it('validates required fields', () => {
    const data = {};
    const errors = validateProject(data);
    
    expect(errors.name).toBeDefined();
    expect(errors.description).toBeDefined();
    expect(errors.startDate).toBeDefined();
    expect(hasErrors(errors)).toBe(true);
  });

  it('validates name length constraints', () => {
    const shortName = validateProject({ name: 'A' });
    expect(shortName.name).toContain('at least 2 characters');
    
    const longName = validateProject({ 
      name: 'A'.repeat(101) 
    });
    expect(longName.name).toContain('must not exceed 100 characters');
    
    const validName = validateProject({ 
      name: 'Valid Project Name' 
    });
    expect(validName.name).toBeUndefined();
  });

  it('validates description length constraints', () => {
    const shortDesc = validateProject({ 
      description: 'Short' 
    });
    expect(shortDesc.description).toContain('at least 10 characters');
    
    const longDesc = validateProject({ 
      description: 'A'.repeat(501) 
    });
    expect(longDesc.description).toContain('must not exceed 500 characters');
    
    const validDesc = validateProject({ 
      description: 'This is a valid project description' 
    });
    expect(validDesc.description).toBeUndefined();
  });

  it('validates date relationships', () => {
    const invalidDates = validateProject({
      startDate: '2024-12-31',
      endDate: '2024-01-01'
    });
    expect(invalidDates.endDate).toContain('End date must be after start date');
    
    const validDates = validateProject({
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    });
    expect(validDates.endDate).toBeUndefined();
  });

  it('validates progress range', () => {
    const negativeProgress = validateProject({ progress: -10 });
    expect(negativeProgress.progress).toContain('between 0 and 100');
    
    const overProgress = validateProject({ progress: 110 });
    expect(overProgress.progress).toContain('between 0 and 100');
    
    const validProgress = validateProject({ progress: 50 });
    expect(validProgress.progress).toBeUndefined();
  });

  it('returns no errors for valid project data', () => {
    const validData = {
      name: 'Valid Project',
      description: 'This is a valid project description with enough characters',
      status: 'planning',
      priority: 'medium',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      tags: ['test'],
      progress: 25
    };
    
    const errors = validateProject(validData);
    expect(hasErrors(errors)).toBe(false);
  });
});