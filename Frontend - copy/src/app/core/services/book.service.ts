import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';



@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  addBook(book: any): Observable<Book[]> {
    return this.http.post<Book[]>(`${this.baseUrl}/books`, book);
  }

  deleteBook(id: string): Observable<Book[]> {
    return this.http.delete<Book[]>(`${this.baseUrl}/books/${id}`);
  }
  updateBook(id: string, book: any) {
    return this.http.put(`${this.baseUrl}/books/${id}`, book);
  }
}
