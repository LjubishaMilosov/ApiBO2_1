import { ICustomWorld } from './../support/world';
import { Given, Then } from '@cucumber/cucumber';
import { APIResponse, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { sendApiRequest } from '../support/utils/utilityFunctions';

//import { I } from '@faker-js/faker/dist/airline-WjISwexU';

dotenv.config();

const apiKey = process.env.API_KEY || 'default_api_key';
const apiUrl = process.env.API_BASE_URL;

console.log('API Key:', process.env.API_KEY);
console.log('API Base URL:', process.env.API_BASE_URL);

let response: APIResponse;

//const tempFilePath = './username.txt'; // Path to save the generated username

Given(
  'I have the player registration details',
  async function (this: ICustomWorld) {
    // generatedUsername = faker.internet.userName();
    // console.log(`Generated Username: ${generatedUsername}`);

    await this.serviceObj?.registrationService.randomFirstname(this);
    await this.serviceObj?.registrationService.randomLastname(this);
    await this.serviceObj?.registrationService.randomUsername(this);
    await this.serviceObj?.registrationService.randomEmail(this);
    await this.serviceObj?.registrationService.randomPhoneNumber(this);

    console.log(`firstname:${this.firstname}`);
    console.log(`lastname:${this.lastname}`);
    console.log(`email:${this.email}`);
    console.log(`phone:${this.phonenumber}`);
    console.log(`username:${this.username}`);
  },
);

Given(
  'I send a POST request to create a new player',
  async function (this: ICustomWorld) {
    const requestBody = {
      apiKey: apiKey,
      loginAccount: 'true',
      activateAccount: 'true',
      customer: {
        CustomerV3: {
          CustomerDetails: {
            FirstName: this.firstname,
            LastName: this.lastname,
            Gender: 'male',
            DateOfBirth: '1991-02-11',
            Address: 'CaptainUP',
            City: 'Toronto',
            Postcode: '214',
            phoneNumber: this.phonenumber,
            MobileNumber: this.phonenumber,
            CountryISO: 'MK',
            LanguageISO: 'EN',
            CurrencyISO: 'EUR',
            TimeZoneName: 'W. Europe Standard Time',
            Email: this.email,
            Username: this.username,
            Password: 'B2Btests@',
            IPAddress: '62.162.212.254',
            IsTestCustomer: 'true',
            CivilIdentificationCode: '4444',
          },
          MarketingDetails: {},
        },
      },
    };

    console.log('Register Request Body:', JSON.stringify(requestBody, null, 2));

    // Use utility function for API request
    response = await sendApiRequest(
      `${apiUrl}/CustomerCreateAccountV4`,
      requestBody,
    );

    const responseBody = await response.json();

    console.log('Registration Response:', responseBody);
  },
);

Then(
  'I should receive a 200 response for registration',
  async function (this: ICustomWorld) {
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(responseBody.Activation.IsActivated).toBe(true);
    const InternalID = responseBody.Customer.InternalID;
    this.InternalID = InternalID;
    console.log(`InternalId value is ${InternalID}`);
  },
);

// Then('I send a POST request to log in the newly registered player', async function (this: ICustomWorld) {
//   const requestBody = {
//     apiKey: apiKey,
//     login: this.username,
//     password: "B2Btests@",
//     ipAddress: "172.10.230.21",
//     returnBalance: true,
//     returnCustomerDetails: true,
//     brandID: 1,
//     browser: "Google Chrome",
//     deviceType: null,
//     deviceModel: "Unknown",
//     deviceOS: "Windows",
//     screenSize: "1536 x 864",
//     cloudfrontCountry: null
//   };

//   console.log('Login Request Body:', JSON.stringify(requestBody, null, 2));

//   response = await sendApiRequest(`${apiUrl}/CustomerLoginAccountV2`, requestBody);

//   const responseBody = await response.json();
//   console.log('Login Response:', responseBody);  // Log the full response for debugging
// });

// Then('I should receive a 200 response for login', async function () {
//   expect(response.status()).toBe(200);
// });

// // Step to verify login success in response
// Then('Login with newly registered user should be successful', async function (this: ICustomWorld) {
//   const responseBody = await response.json();
//   expect(responseBody.IsSuccessful).toBe(true);
// expect(this.InternalID).toEqual(responseBody.Customer.Account.InternalID);
// });

// Then('I store the username for later use', async function () {
//   // Use utility function to save username
//   //saveUsernameToFile(tempFilePath, generatedUsername);
// });
