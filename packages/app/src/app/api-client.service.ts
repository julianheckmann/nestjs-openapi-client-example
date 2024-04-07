import { FactoryProvider, signal } from '@angular/core';
import { MyApi, OpenAPIConfig } from '@example/client';

export class ApiClientService extends MyApi {
  constructor(config?: Partial<OpenAPIConfig>) {
    super(config);
  }

  setBearerToken(token: string): void {
    this.request.config.TOKEN = token;
  }
}

export const ApiClientProvider: FactoryProvider = {
  provide: ApiClientService,
  useFactory: () =>
    new ApiClientService({
      BASE: 'http://localhost:3000', // get from environment
    }),
};
