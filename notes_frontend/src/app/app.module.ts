import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteModalComponent } from './components/note-modal/note-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotesListComponent,
    NoteModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
