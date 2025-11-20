import type { SetupServer } from 'msw/node';

declare global {
  var server: SetupServer;
}

export {};
