import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthEndpoints } from './auth';
import { ApiBuilder } from '../../types';
import { getTodoListEndpoints } from './todoList';
import { getListItemsEndpoints } from './listItems';

export const tagTypes = ['SignIn', 'TodoList', 'ListItem'];

export const api = createApi({
  reducerPath: 'api',
  tagTypes,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  refetchOnMountOrArgChange: false,
  // @ts-expect-error
  endpoints: (builder: ApiBuilder) => ({
    ...getAuthEndpoints(builder),
    ...getTodoListEndpoints(builder),
    ...getListItemsEndpoints(builder),
  }),
});

export const {
  //auth
  useSignInMutation,
  useLogoutMutation,
  //todoList
  useGetTodoListQuery,
  useAddTodoListMutation,
  useUpdateTodoListMutation,
  useDeleteTodoListMutation,
  useGetCountTodoListQuery,
  //listItems
  useGetListItemsQuery,
  useAddListItemMutation,
  useUpdateListItemMutation,
  useDeleteListItemMutation,
  useGetListItemByIdQuery,
  useGetTodoListByIdQuery,
  useGetCountListItemsQuery,
} = api;
