import { Given, When, Then } from '@cucumber/cucumber';
import { APIResponse, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv'
import { sendApiRequest, saveUsernameToFile } from '../src/support/utils/utils';



dotenv.config();

//const apiKey = process.env.API_KEY;
const apiUrl = 'https://api-bo2.btobet.com/Services/GamingPortalService.svc/';
let response: APIResponse;
let generatedUsername: string;

const tempFilePath = './username.txt'; // Path to save the generated username
const apiKey = process.env.API_KEY || 'default_api_key';
Given('I have the player registration details', function () {
  generatedUsername = faker.internet.userName();
  console.log(`Generated Username: ${generatedUsername}`);
});

When('I send a POST request to create a new player', async function () {
  const requestBody = {
    apiKey: apiKey,
    activateAccount: "true",
    customer: {
      CustomerV3: {
        CustomerDetails: {
          FirstName: "TestCU",
          LastName: "Testiranje",
          Gender: "male",
          DateOfBirth: "1991-02-11",
          Address: "CaptainUP",
          City: "Toronto",
          Postcode: "214",
          phoneNumber: faker.phone.number(),
          MobileNumber: faker.phone.number(),
          CountryISO: "MK",
          LanguageISO: "EN",
          CurrencyISO: "EUR",
          TimeZoneName: "W. Europe Standard Time",
          Email: faker.internet.email(),
          Username: generatedUsername,
          Password: "B2Btests",
          IPAddress: "62.162.212.254",
          IsTestCustomer: "true",
          CivilIdentificationCode: "4444"
        }
      }
    }
  };

  // Use utility function for API request
  response = await sendApiRequest(`${apiUrl}/CustomerCreateAccountV4`, requestBody);
  
  const responseBody = await response.json();
  console.log('Registration Response:', responseBody);
});

Then('I should receive a 200 response for registration', async function () {
  expect(response.status()).toBe(200);
});

Then('I store the username for later use', async function () {
  // Use utility function to save username
  saveUsernameToFile(tempFilePath, generatedUsername);
});
