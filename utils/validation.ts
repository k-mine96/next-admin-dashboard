import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from './constants';

/**
 * 이메일 형식 검증
 */
export function validateEmail(email: string): boolean {
  if (!email || email.length > EMAIL_MAX_LENGTH) {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 비밀번호 정책 검증
 * - 최소 8자 이상
 * - 영문 대소문자, 숫자, 특수문자 중 2가지 이상 포함
 */
export function validatePassword(password: string): {
  valid: boolean;
  message?: string;
} {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return {
      valid: false,
      message: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
    };
  }

  if (password.length > PASSWORD_MAX_LENGTH) {
    return {
      valid: false,
      message: `비밀번호는 최대 ${PASSWORD_MAX_LENGTH}자까지 가능합니다.`,
    };
  }

  // 영문 대소문자, 숫자, 특수문자 중 2가지 이상 포함
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password);

  const categories = [hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar];
  const categoryCount = categories.filter(Boolean).length;

  if (categoryCount < 2) {
    return {
      valid: false,
      message: '비밀번호는 영문 대소문자, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.',
    };
  }

  return { valid: true };
}
