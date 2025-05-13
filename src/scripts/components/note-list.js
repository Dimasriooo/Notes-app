import './note-item.js';

class NoteList extends HTMLElement {
  set notes(notes) {
    this._notes = notes;
    this.render();
  }

  render() {
    this.innerHTML = '';
    
    if (this._notes && this._notes.length === 0) {
      this.innerHTML = `
        <div class="empty-notes">
          <p>Tidak ada catatan yang tersedia</p>
        </div>
      `;
      return;
    }
    
    this.innerHTML = '<div class="notes"></div>';
    const notesContainer = this.querySelector('.notes');
    
    if (this._notes && this._notes.length > 0) {
      this._notes.forEach(note => {
        const noteItemElement = document.createElement('note-item');
        noteItemElement.note = note;
        notesContainer.appendChild(noteItemElement);
      });
    }
  }
}

customElements.define('note-list', NoteList);