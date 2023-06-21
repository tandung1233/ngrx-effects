import { Component } from '@angular/core';
import { fetchData } from './store/app.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any;
  error: any;

  constructor(private store: Store<{ app: any }>) {}

  onFetchData() {
    this.store.dispatch(fetchData());
  }

  ngOnInit() {
    this.store.select('app').subscribe((state) => {
      this.data = state.data;
      this.error = state.error;
    });
  }
}
