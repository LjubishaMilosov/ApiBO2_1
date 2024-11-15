//import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { APIRequestContext } from '@playwright/test';
import { ServiceManager } from '../services/serviceManager';
import { World } from '@cucumber/cucumber';

export interface ICustomWorld extends World {
  serviceObj?: ServiceManager;
  username: string;
  email: string;
  phonenumber: string;
  lastname: string;
  firstname: string;
  InternalID:string;
  context?: APIRequestContext;
}