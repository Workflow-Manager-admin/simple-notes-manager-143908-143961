import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-note-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.css']
})
export class NoteModalComponent {
  @Input() note: Note | null = null;
  @Output() close = new EventEmitter<boolean>();

  noteData: Note = { title: '', content: '' };
  loading = false;
  errorMsg: string = '';

  ngOnInit() {
    if (this.note) {
      this.noteData = { ...this.note };
    }
  }

  // PUBLIC_INTERFACE
  saveNote() {
    this.loading = true;
    this.errorMsg = '';
    if (!this.noteData.title.trim()) {
      this.errorMsg = 'Title is required';
      this.loading = false;
      return;
    }
    if (this.note?.id) {
      this.update();
    } else {
      this.create();
    }
  }

  // PUBLIC_INTERFACE
  create() {
    this.notesService.createNote(this.noteData).subscribe({
      next: () => {
        this.loading = false;
        this.close.emit(true);
      },
      error: err => {
        this.loading = false;
        this.errorMsg = err?.error?.message || 'Failed to create note';
      }
    });
  }

  // PUBLIC_INTERFACE
  update() {
    if (!this.noteData.id) return;
    this.notesService.updateNote(this.noteData).subscribe({
      next: () => {
        this.loading = false;
        this.close.emit(true);
      },
      error: err => {
        this.loading = false;
        this.errorMsg = err?.error?.message || 'Failed to update note';
      }
    });
  }

  // PUBLIC_INTERFACE
  cancel() {
    this.close.emit(false);
  }

  // linter trick: force use for lint.
  constructor(private notesService: NotesService) { void notesService; }
}
