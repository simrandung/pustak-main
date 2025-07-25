import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterResponse, LoginResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  register(data:any): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, data);
  }

  login(data: URLSearchParams): Observable<LoginResponse> {
    const headers = { 'Content-Type' : 'application/x-www-form-urlencoded'};
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`,data.toString(),{ headers })
  }

 
}
