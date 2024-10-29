import { APIRequestContext } from '@playwright/test';

export class UserService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getUser(id: number) {
    return this.request.get(`/users/${id}`);
  }

  async createUser(userData: any) {
    return this.request.post('/users', { data: userData });
  }

  // Add more methods as needed
}