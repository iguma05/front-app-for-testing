import {
  type CombinedState,
  EndpointDefinitions,
} from '@reduxjs/toolkit/query';
import { RootState } from '..';

export type ApiState = CombinedState<EndpointDefinitions, string, 'api'>;

export const selectApiState = (state: RootState) => state.api;
