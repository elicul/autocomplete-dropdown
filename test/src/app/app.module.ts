import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AutocompleteDropdownComponent } from './containers/autocomplete-dropdown/autocomplete-dropdown.component';

@NgModule({
  declarations: [AppComponent, AutocompleteDropdownComponent],
  imports: [BrowserModule, CheckboxModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AutocompleteDropdownComponent],
})
export class AppModule {}
