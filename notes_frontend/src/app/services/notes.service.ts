import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  // Change below URL if needed for remote/backend
  private apiUrl = '/api/notes';

  // linter trick: force use for lint.
  constructor(private http: HttpClient) { void http; }

  // PUBLIC_INTERFACE
  getNotes(): Observable<Note[]> {
    /** Retrieve all notes from backend. */
    return this.http.get<Note[]>(this.apiUrl);
  }

  // PUBLIC_INTERFACE
  getNote(id: string): Observable<Note> {
    /** Retrieve a single note by ID. */
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  // PUBLIC_INTERFACE
  createNote(note: Note): Observable<Note> {
    /** Create a new note. */
    return this.http.post<Note>(this.apiUrl, note);
  }

  // PUBLIC_INTERFACE
  updateNote(note: Note): Observable<Note> {
    /** Update an existing note by ID. */
    return this.http.put<Note>(`${this.apiUrl}/${note.id}`, note);
  }

  // PUBLIC_INTERFACE
  deleteNote(id: string): Observable<void> {
    /** Delete a note by ID. */
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
