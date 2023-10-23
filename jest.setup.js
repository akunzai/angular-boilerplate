import '@testing-library/jest-dom';
import 'jest-preset-angular/setup-jest';
import { server } from './src/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
