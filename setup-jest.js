import 'web-streams-polyfill/polyfill';
import '@testing-library/jest-dom';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { server } from './src/mocks/node';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

setupZoneTestEnv();

// Suppress Angular Router warning about parsing undefined URL
const originalWarn = console.warn;
console.warn = (...args) => {
  const message = args[0];
  if (typeof message === 'string' && message.includes('NG04018')) {
    return;
  }
  originalWarn.apply(console, args);
};
