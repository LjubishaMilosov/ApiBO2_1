import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { ICustomWorld } from './world';

BeforeAll(async function () {
  // Run once before all tests
  console.log('Starting test run');
});

Before(async function (this: ICustomWorld) {
  // Run before each scenario
  await this.init();
});

After(async function (this: ICustomWorld) {
  // Run after each scenario
  await this.context?.dispose();
});

AfterAll(async function () {
  // Run once after all tests
  console.log('Test run completed');
});