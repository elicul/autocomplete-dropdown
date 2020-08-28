import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cities$: Observable<SelectItem[]>;
  selectedCity: any;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.searchCities(1);
  }

  searchCities(page: number): void {
    const stop = page * 25;
    const start = stop - 25;
    this.cities$ = this.appService.fetchItems(start, stop, '');
  }
}
