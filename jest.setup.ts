import '@testing-library/jest-dom';
import 'jest-preset-angular/setup-jest';
import './jest.global-mocks';
import { server } from './src/mocks/server';

beforeAll(() => {
  // Enable the mocking in tests.
  server.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  server.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  server.close();
});
