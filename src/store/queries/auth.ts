import type { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';
import { tagTypes } from '.';
import { SignInRequest, SignInResponse } from '../../types';

export const getAuthEndpoints = (
  builder: EndpointBuilder<BaseQueryFn, (typeof tagTypes)[number], 'api'>
) => ({
  signIn: builder.mutation<SignInResponse, SignInRequest>({
    query: (data) => ({ url: '/auth/sign-in', method: 'POST', body: data }),
  }),
  logout: builder.mutation<void, void>({
    query: () => ({ url: '/auth/logout', method: 'POST' }),
  }),
});
