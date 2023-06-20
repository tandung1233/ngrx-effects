import { createAction, props } from '@ngrx/store';

export const fetchData = createAction('[App] Fetch Data');
export const fetchDataSuccess = createAction('[App] Fetch Data Success', props<{ data: any }>()); 
export const fetchDataFailure = createAction('[App] Fetch Data Failure', props<{ error: any }>());