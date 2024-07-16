import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { BooksService } from '../books.service';
import { Book } from '../models/book.model';
import { pipe, switchMap } from 'rxjs';

type BooksState = {
  books: Book[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: BooksState = {
  books: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const BooksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, booksService = inject(BooksService)) => ({
    addBook(book: Book): void {
      patchState(store, (state) => ({ books: [...state.books, book] }));
    },

    loadBooks: rxMethod<void>(
      pipe(
        switchMap(() => {
          patchState(store, { isLoading: true });
          return booksService.getAll().pipe(
            tapResponse({
              next: (books: Book[]) => {
                patchState(store, { books, isLoading: false });
              },
              error: (error) => {
                console.error('Error loading books:', error);
                patchState(store, { isLoading: false });
              },
            })
          );
        })
      )
    ),
  }))
);
