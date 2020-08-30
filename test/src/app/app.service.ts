import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private fetchedItems = new BehaviorSubject<SelectItem[]>([]);
  fetchedItems$ = this.fetchedItems.asObservable();

  constructor(private httpClient: HttpClient) {}

  fetchItems(pageNumber: number, searchTxt: string): void {
    const stopItem = pageNumber * 25;
    const startItem = stopItem - 25;

    let cities$ = this.httpClient.get<SelectItem[]>('assets/cities.json');

    if (!!searchTxt)
      cities$ = cities$.pipe(
        map((x) =>
          x.filter((y: any) =>
            y.city.toLowerCase().includes(searchTxt.toLowerCase())
          )
        )
      );

    cities$
      .pipe(
        map((x) => x.slice(startItem, stopItem)),
        map((x: any) => {
          return x.map((e) => ({
            label: e.city,
            value: e.state,
          }));
        }),
        tap((x) => this.fetchedItems.next(x))
      )
      .subscribe();
  }
}
