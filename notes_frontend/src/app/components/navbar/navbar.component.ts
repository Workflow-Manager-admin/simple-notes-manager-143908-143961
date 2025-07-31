import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
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
