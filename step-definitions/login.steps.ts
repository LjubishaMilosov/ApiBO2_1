import { Given, When, Then } from '@cucumber/cucumber';
import { expect, request, APIResponse } from '@playwright/test';
import dotenv from 'dotenv'
import * as fs from 'fs';

dotenv.config();

const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_BASE_URL || '';
let response: APIResponse;
let generatedUsername: string;

const tempFilePath = './username.txt';  // Path to retrieve the stored username

// Step to get login details with data table for password
Given('I have the login details', function (dataTable) {
  if (fs.existsSync(tempFilePath)) {
    generatedUsername = fs.readFileSync(tempFilePath, 'utf8');  // Load username from file
    console.log(`Loaded Username for Login: ${generatedUsername}`);
  } else {
    throw new Error('No username found to log in');
  }

  // Extract password from the data table
  const data = dataTable.rowsHash();
  this.password = data.password;
  console.log(`Password for Login: ${this.password}`);
});

// Step to send POST request for login
When('I send a POST request to log in the player', async function () {
  const apiContext = await request.newContext();
  const requestBody = {
    apiKey: apiKey,
    login: generatedUsername,  // Use username from file
    password: this.password,    // Use password from the data table
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
  console.log('Login Response:', responseBody);  // Log the full response for debugging
});

// Step to check if the login is successful
Then('I should receive a 200 response for login', async function () {
  expect(response.status()).toBe(200);
});

// Step to verify login success in response
Then('the login should be successful', async function () {
  const responseBody = await response.json();
  expect(responseBody.IsSuccessful).toBe(true);  // Checking if IsSuccessful is true
});
