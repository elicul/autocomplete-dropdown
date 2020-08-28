import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  fetchItems(
    startItem: number,
    endItem: number,
    searchTxt: string
  ): Observable<SelectItem[]> {
    return this.httpClient.get<SelectItem[]>('assets/cities.json').pipe(
      map((x) => x.slice(startItem, endItem + 1)),
      map((x: any) => {
        return x.map((e) => ({
          label: e.city,
          value: e.state,
        }));
      })
    );
  }
}
