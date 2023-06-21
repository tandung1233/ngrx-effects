import { createReducer, on } from '@ngrx/store';
import { fetchData, fetchDataSuccess, fetchDataFailure } from './app.actions';

export interface AppState {
  data: any;
  error: any;
}

export const initialState: AppState = {
  data: null,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(fetchData, (state) => state),
  on(fetchDataSuccess, (state, { data }) => ({ ...state, data })),
  on(fetchDataFailure, (state, { error }) => ({ ...state, error }))
);