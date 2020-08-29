import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private searchTxt = new BehaviorSubject('');
  searchTxt$ = this.searchTxt.asObservable();

  private fetchedItems = new BehaviorSubject<SelectItem[]>([]);
  fetchedItems$ = this.fetchedItems.asObservable();

  constructor(private httpClient: HttpClient) {}

  fetchItems(pageNumber: number, searchTxt: string): void {
    this.searchTxt.next(searchTxt);

    pageNumber += 1;
    const stopItem = pageNumber * 25;
    const startItem = stopItem - 25;

    console.log(searchTxt);

    this.httpClient
      .get<SelectItem[]>('assets/cities.json')
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
