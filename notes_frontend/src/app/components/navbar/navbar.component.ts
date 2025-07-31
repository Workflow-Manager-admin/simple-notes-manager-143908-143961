import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() search = new EventEmitter<string>();
  query: string = '';

  // PUBLIC_INTERFACE
  onSearchChange(q: string) {
    this.search.emit(q);
  }
}
