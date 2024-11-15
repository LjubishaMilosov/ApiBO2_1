import { APIRequestContext } from '@playwright/test';

export class BaseService {
  context: APIRequestContext;

  constructor(context: APIRequestContext) {
    this.context = context;
  }
}
