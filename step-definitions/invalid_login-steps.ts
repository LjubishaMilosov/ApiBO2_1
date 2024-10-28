import { Given, When, Then } from '@cucumber/cucumber';
import { expect, request, APIResponse } from '@playwright/test';
import dotenv from 'dotenv'

dotenv.config();

const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_BASE_URL;
let response: APIResponse;
let invalidCredentials: { username: string, password: string };

// Step definition for "Given I have the following invalid login details"
Given('I have the following invalid login details', function (dataTable) {
  invalidCredentials = dataTable.rowsHash(); // Extracting credentials from the data table
  console.log('Invalid credentials:', invalidCredentials);
});

// Step definition for "When I send a POST request to log in the player with invalid credentials"
When('I send a POST request to log in the player with invalid credentials', async function () {
  const apiContext = await request.newContext();
  const requestBody = {
    apiKey: apiKey,
    login: invalidCredentials.username,
    password: invalidCredentials.password,
    ipAddress: "62.162.212.254",
    brandID: null,
    deviceType: "Default",
    returnBalance: true,
    returnApplicableBonuses: false,
    returnCustomerDetails: true,
    netEntLogin: false,
    browser: "Chrome",
    returnSegments: false,
    lng: "EN"
  };

  response = await apiContext.post(`${apiUrl}/CustomerLoginAccountV2`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestBody,
  });

  const responseBody = await response.json();
  console.log('Invalid Login Response:', responseBody);
});


Then('I should see a login error message {string}', async function (expectedMessage: string) {
    const responseBody = await response.json();
    expect(responseBody.Errors[0].Description).toBe(expectedMessage);
  
  
  });
  
  
  
  
 
  

