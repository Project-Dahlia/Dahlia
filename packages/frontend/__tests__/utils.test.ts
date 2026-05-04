import { cn } from '@/lib/utils';

describe('cn (class name utility)', () => {
  it('should return a single class name unchanged', () => {
    expect(cn('text-red-500')).toBe('text-red-500');
  });

  it('should merge multiple class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('should handle conditional class names (truthy)', () => {
    expect(cn('base', true && 'active')).toBe('base active');
  });

  it('should handle conditional class names (falsy)', () => {
    expect(cn('base', false && 'inactive')).toBe('base');
  });

  it('should handle undefined and null values gracefully', () => {
    expect(cn('base', undefined, null)).toBe('base');
  });

  it('should deduplicate and merge conflicting Tailwind classes', () => {
    // twMerge resolves conflicting Tailwind utilities, keeping the last one
    const result = cn('px-2', 'px-4');
    expect(result).toBe('px-4');
  });

  it('should handle object syntax for conditional classes', () => {
    expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe(
      'text-red-500'
    );
  });

  it('should handle array syntax', () => {
    expect(cn(['px-4', 'py-2'])).toBe('px-4 py-2');
  });

  it('should return an empty string when no arguments are provided', () => {
    expect(cn()).toBe('');
  });
});
