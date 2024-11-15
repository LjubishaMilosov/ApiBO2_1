import { ICustomWorld } from './../support/world';
import { Given, Then } from '@cucumber/cucumber';
import { APIResponse, expect } from '@playwright/test';
import dotenv from 'dotenv'
import { sendApiRequest } from '../support/utils/utilityFunctions';


dotenv.config();
const apiKey = process.env.API_KEY || 'default_api_key';
const apiUrl = process.env.API_BASE_URL;
let response: APIResponse;

Given('I send a POST request to log in the newly registered player', async function (this: ICustomWorld) {
  const requestBody = {
    apiKey: apiKey,
    login: this.username,
    password: "B2Btests@",
    ipAddress: "172.10.230.21",
    returnBalance: true,
    returnCustomerDetails: true,
    brandID: 1,
    browser: "Google Chrome",
    deviceType: null,
    deviceModel: "Unknown",
    deviceOS: "Windows",
    screenSize: "1536 x 864",
    cloudfrontCountry: null
  };

  console.log('Login Request Body:', JSON.stringify(requestBody, null, 2));

  response = await sendApiRequest(`${apiUrl}CustomerLoginAccountV2`, requestBody);

  const responseBody = await response.json();
  console.log('Login Response:', responseBody);  // Log the full response for debugging
});

Then('I should receive a 200 response for login', async function () {
  expect(response.status()).toBe(200);
});

// Step to verify login success in response
Then('Login with newly registered user should be successful', async function (this: ICustomWorld) {
  const responseBody = await response.json();
  expect(responseBody.IsSuccessful).toBe(true); 
expect(this.InternalID).toEqual(responseBody.Customer.Account.InternalID);
console.log(this.InternalID);
});

