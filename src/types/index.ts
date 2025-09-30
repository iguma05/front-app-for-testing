import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';
import { tagTypes } from '../store/queries';

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

export interface HealthCheckResponse {
  status: string;
  uptime: number;
  timestamp: string;
  memory?: NodeJS.MemoryUsage;
}

export interface SignInResponse {
  token: string;
  user: User;
}

export type ApiBuilder = EndpointBuilder<
  BaseQueryFn,
  (typeof tagTypes)[number],
  'api'
>;
export type ListsItemResponse = {
  id: string;
  title: string;
  done: boolean;
};

export type TodoListRequest = Omit<ListItem, 'id'>;

export type TodoListUpdateRequest = {
  id: string;
  title: string;
  description: string;
};
export type TodoListResponse = {
  data: ListItem[];
};
export type ListItem = {
  id: string;
  title: string;
  description: string;
};
export type FilterType = 'all' | 'active' | 'completed';

export type ListItemResponse = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

export type ListItemsResponse = {
  id: string;
  title: string;
  description: string;
  done: boolean;
}[];
export type ListItemRequest = {
  id?: string;
  listId: string;
  title: string;
  description: string;
  done: boolean;
};

export type TodoListDeleteRequest = {
  id: string;
};
