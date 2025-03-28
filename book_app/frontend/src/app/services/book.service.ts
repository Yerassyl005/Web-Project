import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BookResponse } from '../models/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8000/api/book/';

  constructor(private http: HttpClient) { }

  getBooks(page: number = 1, search: string = '', ordering: string = ''): Observable<BookResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('search', search)
      .set('ordering', ordering);

    return this.http.get<BookResponse>(this.apiUrl, { params });
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}${id}/`);
  }
}
