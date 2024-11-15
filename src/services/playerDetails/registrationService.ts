import { ICustomWorld } from "../../support/world";
import { BaseService } from "../baseService";

export default class RegistrationService extends BaseService{


 async generateRandomString(length: number) :Promise<string>{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

 async generateRandomNumber(length: number) :Promise<string>{
  const digits = '0123456789';
  let randomNumber = '';

  for (let i = 0; i < length; i++) {
    randomNumber += digits[Math.floor(Math.random() * digits.length)];
  }

  return randomNumber;
}


async randomFirstname(iCustomWorld: ICustomWorld){
  const randomFirstname = await this.generateRandomString(9);
  
  iCustomWorld.firstname = randomFirstname;
}

async randomLastname(iCustomWorld: ICustomWorld){
  const randomLastname = await this.generateRandomString(9);
  
  iCustomWorld.lastname = randomLastname;
}


async randomPhoneNumber(iCustomWorld: ICustomWorld) {
  const randomPhoneNumber ='234' + await this.generateRandomNumber(9);
  console.log(`RANDOM PHONE: ${randomPhoneNumber}`);
  iCustomWorld.phonenumber = randomPhoneNumber;
}

async randomEmail(iCustomWorld: ICustomWorld) {
  const randomEmail = await this.generateRandomString(4) + await this.generateRandomNumber(5) + '@test.com';
  
  iCustomWorld.email = randomEmail;
}

async randomUsername(iCustomWorld: ICustomWorld) {
  const randomUsername = await this.generateRandomString(4) + await this.generateRandomNumber(5);
  
  iCustomWorld.username = randomUsername;
}



}