import { addNote } from '../data/api';

class AddNote extends HTMLElement {
  connectedCallback() {
    this.render();
    this._initListeners();
  }

  render() {
    this.innerHTML = `
      <form id="noteForm" class="note-form">
        <div class="form-group">
          <label for="title">Judul</label>
          <input type="text" id="title" name="title" maxlength="50" required class="input-title">
        </div>
        <div class="form-group">
          <label for="body">Isi Catatan</label>
          <textarea id="body" name="body" required class="input-body"></textarea>
        </div>
        <button type="submit" class="btn">
          <i class="fas fa-plus"></i> Tambah Catatan
        </button>
      </form>
    `;
  }

  _initListeners() {
    const form = this.querySelector('#noteForm');
    
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const titleInput = this.querySelector('#title');
      const bodyInput = this.querySelector('#body');
      
      const title = titleInput.value;
      const body = bodyInput.value;
      
      try {
        await addNote(title, body);
        
        // Reset form
        titleInput.value = '';
        bodyInput.value = '';
        
        // Trigger event to refresh notes
        const refreshEvent = new CustomEvent('refresh-notes');
        document.dispatchEvent(refreshEvent);
      } catch (error) {
        console.error('Error adding note:', error);
      }
    });
  }
}

customElements.define('add-note', AddNote);