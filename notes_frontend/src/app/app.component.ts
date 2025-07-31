import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NavbarComponent, NotesListComponent]
})
export class AppComponent {}
