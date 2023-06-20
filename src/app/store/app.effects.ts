import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { fetchData, fetchDataSuccess, fetchDataFailure } from './app.actions';
import { DataService } from './data.service';

@Injectable()
export class AppEffects {
  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchData),
      mergeMap(() =>
        this.dataService.fetchData().pipe(
          map((data) => fetchDataSuccess({ data })),
          catchError((error) => of(fetchDataFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) {}
}