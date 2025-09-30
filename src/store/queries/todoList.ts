import type { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';
import { tagTypes } from '.';
import {
  ListItem,
  TodoListResponse,
  TodoListUpdateRequest,
  TodoListDeleteRequest,
} from '../../types';

export const getTodoListEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, (typeof tagTypes)[number], 'api'>
) => ({
  getTodoList: builder.query<TodoListResponse, void>({
    query: () => ({ url: '/todo-list', method: 'GET' }),
    providesTags: ['TodoList'],
  }),
  addTodoList: builder.mutation<{ id: number }, Omit<ListItem, 'id'>>({
    query: (data) => ({ url: '/todo-list', method: 'POST', body: data }),
    invalidatesTags: ['TodoList'],
  }),
  updateTodoList: builder.mutation<{ status: string }, TodoListUpdateRequest>({
    query: (data) => ({ url: `/todo-list`, method: 'PUT', body: data }),
    invalidatesTags: ['TodoList'],
  }),
  deleteTodoList: builder.mutation<{ status: string }, TodoListDeleteRequest>({
    query: (data) => ({ url: `/todo-list`, method: 'DELETE', body: data }),
    invalidatesTags: ['TodoList'],
  }),
  getTodoListById: builder.query<ListItem, { id: string }>({
    query: ({ id }) => ({ url: `/todo-list/${id}`, method: 'GET' }),
    providesTags: (result, error, { id }) => [{ type: 'TodoList', id }],
  }),
  getCountTodoList: builder.query<{ count: number }, void>({
    query: () => ({ url: '/todo-list', method: 'GET' }),
    transformResponse: (response: TodoListResponse) => {
      return { count: response.data.length };
    },
    providesTags: ['TodoList'],
  }),
});
