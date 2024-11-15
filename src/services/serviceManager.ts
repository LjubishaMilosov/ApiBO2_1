import { AuthService } from './authService';
import { BaseService } from "./baseService";
import { APIRequestContext } from "playwright/test";
import RegistrationService from './playerDetails/registrationService';



export class ServiceManager {
    baseService: BaseService;
    authService: AuthService;

registrationService: RegistrationService;


    constructor(request: APIRequestContext) {
        this.baseService = new BaseService(request);
        this.authService = new AuthService(request);
        this.registrationService = new RegistrationService(request);

    }

}
