import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { ICustomWorld } from './world';
import { ServiceManager } from '../services/serviceManager';
import { request } from 'playwright/test';

BeforeAll(async function () {
  console.log('Starting test run');
});

Before(async function (this: ICustomWorld) {
  this.context = await request.newContext({});

  this.serviceObj = new ServiceManager(this.context);
});

After(async function (this: ICustomWorld) {
  await this.context?.dispose();
});

AfterAll(async function () {
  console.log('Test run completed');
});
