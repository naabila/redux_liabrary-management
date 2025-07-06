import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Borrow, BorrowSummary } from '../types/index';

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/borrows' }),
  tagTypes: ['Borrows'],
  endpoints: (builder) => ({
    createBorrow: builder.mutation<Borrow, Partial<Borrow>>({
      query: (borrow) => ({
        url: '/',
        method: 'POST',
        body: borrow,
      }),
      async onQueryStarted(borrow, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            bookApi.util.updateQueryData('getBooks', { page: 1, limit: 10 }, (draft) => {
              const index = draft.books.findIndex((b) => b._id === borrow.bookId);
              if (index !== -1) {
                draft.books[index].copies -= borrow.quantity!;
                draft.books[index].available = draft.books[index].copies > 0;
              }
            })
          );
        } catch {}
      },
      invalidatesTags: ['Borrows'],
    }),
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => '/summary',
      providesTags: ['Borrows'],
    }),
  }),
});

export const { useCreateBorrowMutation, useGetBorrowSummaryQuery } = borrowApi;