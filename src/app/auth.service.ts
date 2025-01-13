import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:5200';

  constructor(private httpClient: HttpClient) { }

  login(creds: { username: string, password: string }) {
    this.httpClient.post(`${this.url}/login`, creds, { responseType: 'text' });
  }

  register(creds: { username: string, password: string }) {
    return this.httpClient.post(`${this.url}/users/register`, creds, { responseType: 'text' });
  }
}
