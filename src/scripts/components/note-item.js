import { archiveNote, unarchiveNote, deleteNote } from '../data/api';

class NoteItem extends HTMLElement {
  set note(note) {
    this._note = note;
    this.render();
  }

  render() {
    const { id, title, body, createdAt, archived } = this._note;
    
    // Format tanggal
    const formattedDate = new Date(createdAt).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.innerHTML = `
      <div class="note-item fade-in">
        <h3 class="note-title">${title}</h3>
        <p class="date">${formattedDate}</p>
        <p class="body">${body}</p>
        <div class="note-actions">
          <button class="btn ${archived ? 'btn-unarchive' : 'btn-archive'}" id="${archived ? 'unarchive' : 'archive'}-${id}">
            <i class="fas fa-${archived ? 'inbox' : 'archive'}"></i> 
            ${archived ? 'Kembalikan' : 'Arsipkan'}
          </button>
          <button class="btn btn-delete" id="delete-${id}">
            <i class="fas fa-trash"></i> Hapus
          </button>
        </div>
      </div>
    `;

    this._attachEventListeners(id, archived);
  }

  _attachEventListeners(id, isArchived) {
    const archiveActionId = isArchived ? `unarchive-${id}` : `archive-${id}`;
    const deleteButtonId = `delete-${id}`;

    // Archive/Unarchive button
    const archiveButton = this.querySelector(`#${archiveActionId}`);
    if (archiveButton) {
      archiveButton.addEventListener('click', async () => {
        try {
          if (isArchived) {
            await unarchiveNote(id);
          } else {
            await archiveNote(id);
          }
          
          // Trigger event to refresh notes
          const refreshEvent = new CustomEvent('refresh-notes');
          document.dispatchEvent(refreshEvent);
        } catch (error) {
          console.error('Error toggling archive state:', error);
        }
      });
    }

    // Delete button
    const deleteButton = this.querySelector(`#${deleteButtonId}`);
    if (deleteButton) {
      deleteButton.addEventListener('click', async () => {
        try {
          await deleteNote(id);
          
          // Trigger event to refresh notes
          const refreshEvent = new CustomEvent('refresh-notes');
          document.dispatchEvent(refreshEvent);
        } catch (error) {
          console.error('Error deleting note:', error);
        }
      });
    }
  }
}

customElements.define('note-item', NoteItem);