export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}