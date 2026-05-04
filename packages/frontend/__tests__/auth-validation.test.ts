import { userAuthSchema, changePasswordSchema } from '@/lib/validation/auth';

// ─── userAuthSchema ────────────────────────────────────────────────────────

describe('userAuthSchema', () => {
  describe('email validation', () => {
    it('should accept a valid email address', () => {
      const result = userAuthSchema.safeParse({
        email: 'user@example.com',
        password: 'secret123'
      });
      expect(result.success).toBe(true);
    });

    it('should reject an invalid email address', () => {
      const result = userAuthSchema.safeParse({
        email: 'not-an-email',
        password: 'secret123'
      });
      expect(result.success).toBe(false);
      const errors = result.error?.flatten().fieldErrors;
      expect(errors?.email).toBeDefined();
    });

    it('should reject an empty email', () => {
      const result = userAuthSchema.safeParse({
        email: '',
        password: 'secret123'
      });
      expect(result.success).toBe(false);
    });
  });

  describe('password validation', () => {
    it('should accept a password with at least 6 characters', () => {
      const result = userAuthSchema.safeParse({
        email: 'user@example.com',
        password: 'abcdef'
      });
      expect(result.success).toBe(true);
    });

    it('should reject a password shorter than 6 characters', () => {
      const result = userAuthSchema.safeParse({
        email: 'user@example.com',
        password: 'abc'
      });
      expect(result.success).toBe(false);
      const errors = result.error?.flatten().fieldErrors;
      expect(errors?.password).toBeDefined();
    });
  });

  describe('name validation (optional for login)', () => {
    it('should accept a valid name for registration', () => {
      const result = userAuthSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
      expect(result.success).toBe(true);
    });

    it('should accept schema without name field', () => {
      const result = userAuthSchema.safeParse({
        email: 'john@example.com',
        password: 'password123'
      });
      expect(result.success).toBe(true);
    });

    it('should reject a name with invalid characters', () => {
      const result = userAuthSchema.safeParse({
        name: 'John123',
        email: 'john@example.com',
        password: 'password123'
      });
      expect(result.success).toBe(false);
      const errors = result.error?.flatten().fieldErrors;
      expect(errors?.name).toBeDefined();
    });
  });
});

// ─── changePasswordSchema ──────────────────────────────────────────────────

describe('changePasswordSchema', () => {
  it('should accept matching passwords that meet the minimum length', () => {
    const result = changePasswordSchema.safeParse({
      password: 'newpassword',
      confirmPassword: 'newpassword'
    });
    expect(result.success).toBe(true);
  });

  it('should reject passwords shorter than 6 characters', () => {
    const result = changePasswordSchema.safeParse({
      password: 'abc',
      confirmPassword: 'abc'
    });
    expect(result.success).toBe(false);
    const errors = result.error?.flatten().fieldErrors;
    expect(errors?.password).toBeDefined();
  });

  it("should reject when passwords don't match", () => {
    const result = changePasswordSchema.safeParse({
      password: 'password123',
      confirmPassword: 'different456'
    });
    expect(result.success).toBe(false);
    const errors = result.error?.flatten().fieldErrors;
    expect(errors?.confirmPassword).toBeDefined();
  });

  it('should reject empty passwords', () => {
    const result = changePasswordSchema.safeParse({
      password: '',
      confirmPassword: ''
    });
    expect(result.success).toBe(false);
  });

  it('should reject when only confirmPassword does not match', () => {
    const result = changePasswordSchema.safeParse({
      password: 'correct123',
      confirmPassword: 'incorrect'
    });
    expect(result.success).toBe(false);
  });
});
