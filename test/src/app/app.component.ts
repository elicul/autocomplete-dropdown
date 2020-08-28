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
    this.searchCities(0, 25);
  }

  searchCities(start, stop): void {
    this.cities$ = this.appService.fetchItems(start, stop, '');
  }
}
