import { Component } from '@angular/core';
import { fetchData } from './store/app.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data: any;
  error: any;

  constructor(private store: Store<{ app: any }>) {}
  ngOnInit() {
    // 9. Các thành phần UI (ví dụ: AppComponent) đã đăng ký theo dõi trạng thái ứng dụng từ store thông qua phương thức select().
    // 10. Khi reducer cập nhật trạng thái trong store, các thành phần UI nhận được thông báo về sự thay đổi này và có thể tiếp tục xử lý
    // 11. Các thành phần UI sử dụng phương thức select() để truy vấn trạng thái mới từ store. Thông qua việc truy xuất trạng thái từ store, các thành phần UI có thể lấy dữ liệu mới và cập nhật giao diện người dùng tương ứng.
    // 12. Các thành phần UI có thể sử dụng dữ liệu từ trạng thái mới để hiển thị thông tin, thực hiện các tương tác người dùng, hoặc thực hiện các hành động khác tùy thuộc vào logic ứng dụng.
    this.store.select('app').subscribe((state) => {
      this.data = state.data;
      this.error = state.error;
    });
  }

  onFetchData() {
    // 2. Một action fetchData được gửi đến store thông qua phương thức dispatch().
    this.store.dispatch(fetchData());
  }
}
