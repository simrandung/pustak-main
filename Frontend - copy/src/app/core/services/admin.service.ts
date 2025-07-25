import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Cart } from '../models/cart.model';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8000/api'

  constructor(private http: HttpClient) { }

 
  getTopBooks():Observable<Cart[]>{
    return this.http.get<Cart[]>(`${this.baseUrl}/top-books`);
  }

  getAllBooks():Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }
}
