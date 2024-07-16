import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksStore } from './store/books.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [BooksStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public store = inject(BooksStore);

  public ngOnInit(): void {}

  public addBook(): void {
    this.store.addBook({
      id: 2,
      title: 'Harry Potter',
      author: 'J. K. Rowling',
      genre: 'Fantasy',
      price: 12.99,
      publishDate: '2001-09-10',
    });
  }

  public loadBooks(): void {
    this.store.loadBooks();
  }
}
