// Setup localStorage mock before any imports
class LocalStorageMock implements Storage {
  private store: Map<string, string> = new Map();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  key(index: number): string | null {
    const keys = Array.from(this.store.keys());
    return keys[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
}

// Setup in globalThis for Node environment
Object.defineProperty(globalThis, 'localStorage', {
  value: new LocalStorageMock(),
  writable: true,
  configurable: true,
});

import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll } from 'vitest';

declare global {
  var server: ReturnType<typeof import('msw/node').setupServer>;
}

beforeAll(async () => {
  const { setupServer } = await import('msw/node');
  const { handlers } = await import('./src/mocks/handlers');
  globalThis.server = setupServer(...handlers);
  globalThis.server.listen();
});

afterEach(() => {
  if (globalThis.server) {
    globalThis.server.resetHandlers();
  }
});

afterAll(() => {
  if (globalThis.server) {
    globalThis.server.close();
  }
});

const originalWarn = console.warn;
console.warn = (...args: Parameters<typeof console.warn>) => {
  const [message] = args;
  if (typeof message === 'string' && message.includes('NG04018')) {
    return;
  }
  originalWarn(...args);
};
