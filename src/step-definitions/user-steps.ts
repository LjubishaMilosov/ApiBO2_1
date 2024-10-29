import { Given, When, Then } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/world';
import { expect } from '@playwright/test';

Given('I have a valid user ID', function (this: ICustomWorld) {
  this.setTestData('userId', 1);
});

When('I request the user details', async function (this: ICustomWorld) {
  const userId = this.getTestData('userId');
  const response = await this.userService?.getUser(userId);
  this.setTestData('response', response);
});

Then('I should receive the correct user information', async function (this: ICustomWorld) {
  const response = this.getTestData('response');
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.id).toBe(this.getTestData('userId'));
});