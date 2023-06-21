import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { fetchData, fetchDataSuccess, fetchDataFailure } from './app.actions';
import { DataService } from './data.service';
// 3. Action fetchData được lắng nghe bởi effects (trong trường hợp của chúng ta, effect fetchData$).
// 4. Effect fetchData$ được kích hoạt và thực hiện các tác vụ liên quan đến tác động phụ, ví dụ: gọi API thông qua DataService.
// 5. Khi dữ liệu từ API được trả về thành công, effect fetchData$ sẽ tạo ra một action fetchDataSuccess và phát ra.
@Injectable()
export class AppEffects {
  // Đây là hàm khởi tạo của effect. Nó nhận vào hai tham số là actions$ và dataService. actions$ là một service cung cấp một luồng các actions được phát ra từ store. dataService là một service để gọi các API liên quan đến dữ liệu
  constructor(private actions$: Actions, private dataService: DataService) {}
  // Đây là khai báo một effect mới có tên là fetchData$. Effect này sẽ xử lý các actions được phát ra từ store và thực hiện các tác vụ liên quan đến lấy dữ liệu.
  fetchData$ = createEffect(() =>
    // Ở đây, chúng ta sử dụng phương thức pipe của observable actions$ để xử lý dữ liệu.
    this.actions$.pipe(
      // Chúng ta sử dụng toán tử ofType để lọc các actions chỉ chấp nhận action có kiểu là fetchData. Điều này chỉ cho effect biết rằng nó chỉ nên xử lý action có kiểu là fetchData.
      ofType(fetchData),
      // Sau khi nhận được action fetchData, chúng ta sử dụng toán tử mergeMap để tiếp tục thực hiện tác động phụ. Ở đây, chúng ta gọi phương thức fetchData() của dataService để gửi yêu cầu lấy dữ liệu từ API
      mergeMap(() =>
        // Đây là phần xử lý trong mergeMap. Chúng ta gọi phương thức fetchData() của dataService và sử dụng toán tử pipe để thực hiện các xử lý dữ liệu tiếp theo trên observable trả về từ phương thức fetchData().
        this.dataService.fetchData().pipe(
          // : Sau khi dữ liệu từ API được trả về thành công, chúng ta sử dụng toán tử map để tạo ra một action fetchDataSuccess với dữ liệu đã nhận được từ API. Action này sẽ được phát ra từ effect để được xử lý bởi reducer.
          map((data) => fetchDataSuccess({ data })),
          // Nếu xảy ra lỗi trong quá trình gọi API, chúng ta sử dụng toán tử catchError để bắt lỗi và tạo ra một action fetchDataFailure với thông tin lỗi. Action này cũng sẽ được phát ra từ effect để được xử lý bởi reducer.
          catchError((error) => of(fetchDataFailure({ error })))
        )
      )
    )
  );
}
// Tóm lại, đoạn code trên định nghĩa một effect fetchData$ sử dụng để xử lý action fetchData. Effect này lắng nghe action, gọi phương thức fetchData() của dataService để lấy dữ liệu từ API, và sau đó phát ra các action fetchDataSuccess hoặc fetchDataFailure tùy thuộc vào kết quả của API call.
