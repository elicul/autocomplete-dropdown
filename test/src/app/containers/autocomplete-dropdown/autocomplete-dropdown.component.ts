import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-autocomplete-dropdown',
  templateUrl: './autocomplete-dropdown.component.html',
  styleUrls: ['./autocomplete-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteDropdownComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
