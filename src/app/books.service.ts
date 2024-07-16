import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private httpClient = inject(HttpClient);

  public getAll(): Observable<Book[]> {
    return this.httpClient.get<Book[]>('https://freetestapi.com/api/v1/books');
  }
}
