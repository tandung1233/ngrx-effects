# ngrx-effects
Học effects hiểu bản chất nhờ repo này
Khi người dùng nhấn vào nút "Fetch Data" trong component AppComponent, sẽ xảy ra các bước thực hiện như sau:

Người dùng nhấn vào nút "Fetch Data".
Trong phương thức onFetchData() của AppComponent, một hành động (action) fetchData() được gửi đến store thông qua phương thức dispatch() của đối tượng store.
Trong AppEffects, effect fetchData$ lắng nghe hành động fetchData.
Effect fetchData$ sử dụng toán tử mergeMap để gọi phương thức fetchData() của DataService. Điều này tạo ra một observable từ kết quả của API call.
Khi API call hoàn thành, effect fetchData$ sử dụng toán tử map để tạo ra một hành động fetchDataSuccess với dữ liệu trả về từ API.
Nếu xảy ra lỗi trong quá trình gọi API, effect fetchData$ sử dụng toán tử catchError để tạo ra một hành động fetchDataFailure với thông tin lỗi.
Hành động fetchDataSuccess hoặc fetchDataFailure được phát ra từ effect fetchData$.
Reducer reducer lắng nghe các hành động fetchDataSuccess hoặc fetchDataFailure.
Reducer reducer cập nhật trạng thái của ứng dụng tương ứng với dữ liệu thành công hoặc lỗi.
Các thành phần UI, như AppComponent, đăng ký theo dõi trạng thái ứng dụng từ store thông qua phương thức select().
Khi trạng thái của ứng dụng thay đổi, các thành phần UI nhận được thông báo và cập nhật giao diện người dùng hiển thị dữ liệu mới hoặc thông báo lỗi.
Tóm lại, khi người dùng nhấn nút "Fetch Data", action fetchData được gửi đến store, effect fetchData$ xử lý tác động phụ gọi API và phát ra các actions tương ứng, reducer cập nhật trạng thái ứng dụng, và cuối cùng, giao diện người dùng được cập nhật dựa trên trạng thái mới.
