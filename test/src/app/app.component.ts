import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { AppService } from './app.service';
import { Observable, fromEvent, Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('pDropdown', { static: false }) pDropdown: Dropdown;

  cities$: Observable<SelectItem[]>;
  onScroll$: Subscription;
  selectedCity: any;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.cities$ = this.appService.fetchedItems$;
    this.appService.fetchItems(0, '');
  }

  ngAfterViewInit(): void {
    // this.pDropdown.filterViewChild.nativeElement.target.value
  }

  searchCities(event: any) {
    console.log(event);
    // this.appService.fetchItems(0, '');
  }

  onDropdownShow() {
    if (this.onScroll$) return;

    this.onScroll$ = fromEvent(this.pDropdown.itemsWrapper, 'scroll').subscribe(
      () => {
        const scrollTop = this.pDropdown.itemsWrapper.scrollTop + 200;
        const itemsHeight = this.pDropdown.itemsWrapper.firstElementChild[
          'offsetHeight'
        ];

        if (scrollTop == itemsHeight) {
          console.log('Load new data!');
          this.appService.fetchItems(1, '');
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.onScroll$) this.onScroll$.unsubscribe();
  }
}
