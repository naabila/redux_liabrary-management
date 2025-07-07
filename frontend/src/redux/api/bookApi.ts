import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../types/index';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    getBooks: builder.query<{ books: Book[]; total: number; page: number; limit: number }, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `books?page=${page}&limit=${limit}`,
      providesTags: ['Books'],
    }),
    getBookById: builder.query<Book, string>({
      query: (id) => `books/${id}`,
      providesTags: ['Books'],
    }),
    createBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: 'books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Books'],
    }),
    updateBook: builder.mutation<Book, { id: string; book: Partial<Book> }>({
      query: ({ id, book }) => ({
        url: `books/${id}`,
        method: 'PUT',
        body: book,
      }),
      invalidatesTags: ['Books'],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
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