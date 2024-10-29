import { Given, When, Then } from '@cucumber/cucumber';
import { APIResponse, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { sendApiRequest } from '../support/utils/utils';
import dotenv from 'dotenv'

dotenv.config();
const apiKey = process.env.API_KEY || 'default_api_key';
const apiUrl = process.env.API_BASE_URL;
let response: APIResponse;

// Given step: Prepare registration details with missing username
Given('I have the player registration details with missing username', function () {
  this.requestBody = {
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
          Username: "",  // Username intentionally left empty
          Password: "B2Btests",
          IPAddress: "62.162.212.254",
          IsTestCustomer: "true",
          CivilIdentificationCode: "4444"
        }
      }
    }
  };
});

// When step: Send POST request with invalid details
When('I send a POST request to create a new player with invalid details', async function () {
  response = await sendApiRequest(`${apiUrl}/CustomerCreateAccountV4`, this.requestBody);
});

Then('I should see a registration error message {string}', async function (expectedMessage: string) {
  const responseBody = await response.json();
  expect(responseBody.Errors[0].Description).toBe(expectedMessage);
});





  
  

