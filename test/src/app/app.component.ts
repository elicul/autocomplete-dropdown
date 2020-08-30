import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { AppService } from './app.service';
import { fromEvent, Subscription } from 'rxjs';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('pDropdown', { static: false }) pDropdown: Dropdown;

  cities: SelectItem[];
  cities$: Subscription;
  onScroll$: Subscription;
  onFilter$: Subscription;
  searchTxt: string = '';
  currentPage: number = 1;
  selectedCity: any;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.cities$ = this.appService.fetchedItems$
      .pipe(
        map((x) => {
          if (this.currentPage > 1) {
            this.cities = [...this.cities, ...x];
          } else {
            this.cities = x;
          }
        })
      )
      .subscribe();
    this.appService.fetchItems(this.currentPage, this.searchTxt);
  }

  onDropdownShow(): void {
    if (!this.onFilter$) {
      this.onFilter$ = fromEvent(
        this.pDropdown.filterViewChild.nativeElement,
        'keyup'
      )
        .pipe(
          map((x: any) => x.target.value),
          debounceTime(500),
          distinctUntilChanged()
        )
        .subscribe((x) => {
          console.log('Load new data!');
          if (!x) {
            this.searchTxt = '';
            this.fetchNewItems(false);
          } else {
            this.searchTxt = x;
            this.fetchNewItems(false);
          }
        });
    }

    if (!this.onScroll$) {
      this.onScroll$ = fromEvent(
        this.pDropdown.itemsWrapper,
        'scroll'
      ).subscribe(() => {
        const scrollTop = this.pDropdown.itemsWrapper.scrollTop + 200;
        const itemsHeight = this.pDropdown.itemsWrapper.firstElementChild[
          'offsetHeight'
        ];

        if (scrollTop == itemsHeight) {
          console.log('Load new data!');
          this.fetchNewItems(true);
        }
      });
    }
  }

  fetchNewItems(fetchNewPage: boolean): void {
    if (fetchNewPage) {
      this.currentPage += 1;
    } else {
      this.currentPage = 1;
    }

    this.appService.fetchItems(this.currentPage, this.searchTxt);
  }

  ngOnDestroy(): void {
    if (this.cities$) this.cities$.unsubscribe();
    if (this.onScroll$) this.onScroll$.unsubscribe();
    if (this.onFilter$) this.onFilter$.unsubscribe();
  }
}
