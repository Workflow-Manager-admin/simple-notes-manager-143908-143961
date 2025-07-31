import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';

declare var confirm: any;

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  searchQuery: string = '';
  modalOpen = false;
  modalNote: Note | null = null;

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  // PUBLIC_INTERFACE
  fetchNotes(): void {
    this.notesService.getNotes().subscribe((notes) => {
      // Sort by updatedAt descending
      this.notes = notes.slice().sort((a, b) =>
        (b.updatedAt?.localeCompare(a.updatedAt || '') || 0) -
        (a.updatedAt?.localeCompare(b.updatedAt || '') || 0)
      );
      this.applySearch();
    });
  }

  // PUBLIC_INTERFACE
  applySearch(): void {
    if (!this.searchQuery.trim()) {
      this.filteredNotes = this.notes;
      return;
    }
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredNotes = this.notes.filter(note =>
      (note.title && note.title.toLowerCase().includes(q)) ||
      (note.content && note.content.toLowerCase().includes(q))
    );
  }

  // PUBLIC_INTERFACE
  onOpenModal(note?: Note): void {
    this.modalNote = note ? { ...note } : null;
    this.modalOpen = true;
  }

  // PUBLIC_INTERFACE
  onCloseModal(refresh = false): void {
    this.modalOpen = false;
    this.modalNote = null;
    if (refresh) {
      this.fetchNotes();
    }
  }

  // PUBLIC_INTERFACE
  editNote(note: Note): void {
    this.onOpenModal(note);
  }

  // PUBLIC_INTERFACE
  deleteNote(note: Note): void {
    if (!note.id) return;
    if (confirm(`Are you sure you want to delete "${note.title}"?`)) {
      this.notesService.deleteNote(note.id).subscribe(() => {
        this.fetchNotes();
      });
    }
  }
}
