import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../types/index';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/books' }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query<{ books: Book[]; total: number; page: number; limit: number }, { page: number; limit: number }>({
      query: ({ page, limit }) => `/?page=${page}&limit=${limit}`,
      providesTags: ['Books'],
    }),
    getBookById: builder.query<Book, string>({
      query: (id) => `/${id}`,
      providesTags: ['Books'],
    }),
    createBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: '/',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Books'],
    }),
    updateBook: builder.mutation<Book, { id: string; book: Partial<Book> }>({
      query: ({ id, book }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: book,
      }),
      async onQueryStarted({ id, book }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          bookApi.util.updateQueryData('getBooks', { page: 1, limit: 10 }, (draft) => {
            const index = draft.books.findIndex((b) => b._id === id);
            if (index !== -1) {
              draft.books[index] = { ...draft.books[index], ...book, available: book.copies! > 0 };
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Books'],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          bookApi.util.updateQueryData('getBooks', { page: 1, limit: 10 }, (draft) => {
            draft.books = draft.books.filter((b) => b._id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;