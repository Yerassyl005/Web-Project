import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getBooks(page: number = 1, search: string = '', ordering: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', '10');

    if (search) {
      params = params.set('search', search);
    }

    if (ordering) {
      params = params.set('ordering', ordering);
    }

    return this.http.get(`${this.apiUrl}/book/`, { params });
  }

  getBook(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/book/${id}/?qStatus=1`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/category/`);
  }

  getBooksByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/category/${categoryId}/books/`);
  }

  getReadingProgress(bookId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/book/${bookId}/progress/`);
  }

  updateReadingProgress(bookId: number, lastPage: number, isCompleted: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/book/${bookId}/progress/`, {
      last_page: lastPage,
      is_completed: isCompleted
    });
  }
}
