import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { APIRequestContext, request } from '@playwright/test';
import { UserService } from '../services/UserService';

export interface ICustomWorld extends World {
  context?: APIRequestContext;
  userService?: UserService;
  testData: Map<string, any>;
  init(): Promise<void>;  // Add this
  setTestData(key: string, value: any): void;  // Add this
  getTestData(key: string): any;  // Add this
}

export class CustomWorld extends World implements ICustomWorld {
  context?: APIRequestContext;
  userService?: UserService;
  testData: Map<string, any> = new Map();

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(): Promise<void> {
    this.context = await request.newContext({
      // Add any global settings here, like baseURL
      baseURL: 'https://api.example.com',
    });
    this.userService = new UserService(this.context);
  }

  setTestData(key: string, value: any): void {
    this.testData.set(key, value);
  }

  getTestData(key: string): any {
    return this.testData.get(key);
  }
}

setWorldConstructor(CustomWorld);