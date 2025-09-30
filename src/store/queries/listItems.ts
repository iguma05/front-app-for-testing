import type { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';
import { tagTypes } from '.';
import {
  ListItemRequest,
  ListItemResponse,
  ListItemsResponse,
} from '../../types';

export const getListItemsEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, (typeof tagTypes)[number], 'api'>
) => ({
  getListItems: builder.query<ListItemsResponse, { id: string }>({
    query: ({ id }) => ({ url: `/list/${id}/items`, method: 'GET' }),
    providesTags: (result, error, { id }) => [
      { type: 'ListItem', id: `list-${id}` },
      { type: 'ListItem', id: 'LIST' },
    ],
  }),
  addListItem: builder.mutation<{ id: number }, ListItemRequest>({
    query: (data) => ({
      url: `/list-items/items`,
      method: 'POST',
      body: data,
    }),
    invalidatesTags: (result, error, data) => [
      { type: 'ListItem', id: `list-${data.listId}` },
      { type: 'ListItem', id: 'LIST' },
      { type: 'ListItem', id: 'COUNT' },
    ],
  }),
  updateListItem: builder.mutation<{ status: string }, ListItemRequest>({
    query: (data) => ({
      url: `/list/items/${data.id}`,
      method: 'PUT',
      body: data,
    }),
    invalidatesTags: (result, error, data) => [
      { type: 'ListItem', id: data.id },
      { type: 'ListItem', id: `list-${data.listId}` },
      { type: 'ListItem', id: 'LIST' },
    ],
  }),
  deleteListItem: builder.mutation<{ status: string }, ListItemRequest>({
    query: (data) => ({
      url: `/list/items/${data.id}`,
      method: 'DELETE',
      body: data,
    }),
    invalidatesTags: (result, error, data) => [
      { type: 'ListItem', id: data.id },
      { type: 'ListItem', id: `list-${data.listId}` },
      { type: 'ListItem', id: 'LIST' },
      { type: 'ListItem', id: 'COUNT' },
    ],
  }),
  getListItemById: builder.query<ListItemResponse, { id: string }>({
    query: ({ id }) => ({ url: `/list/items/${id}`, method: 'GET' }),
    providesTags: (result, error, { id }) => [{ type: 'ListItem', id }],
  }),
  getCountListItems: builder.query<{ count: number }, void>({
    query: () => ({ url: '/list-items', method: 'GET' }),
    transformResponse: (response: ListItemsResponse) => {
      return { count: response.length };
    },
    providesTags: [{ type: 'ListItem', id: 'COUNT' }],
  }),
});
