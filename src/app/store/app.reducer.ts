import { createReducer, on } from '@ngrx/store';
import { fetchData, fetchDataSuccess, fetchDataFailure } from './app.actions';

export interface AppState {
  data: any;
  error: any;
}

export const initialState: AppState = {
  data: null,
  error: null,
};
// 6. Action fetchDataSuccess được lắng nghe bởi reducer (trong trường hợp của chúng ta, reducer reducer).
// 7. Reducer reducer nhận action fetchDataSuccess và cập nhật trạng thái ứng dụng trong store với dữ liệu mới.
// 8. Sau khi reducer đã cập nhật lại store, trạng thái mới của ứng dụng được lưu trữ trong store và sẵn sàng để được truy xuất bởi các thành phần khác trong ứng dụng.
export const reducer = createReducer(
  initialState,
  on(fetchData, (state) => state),
  on(fetchDataSuccess, (state, { data }) => ({ ...state, data })),
  on(fetchDataFailure, (state, { error }) => ({ ...state, error }))
);
