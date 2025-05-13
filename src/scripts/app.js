import { getNotes, isLoggedIn } from './data/api';
import './components/app-bar';
import './components/loading-indicator';
import './components/note-list';
import './components/add-note';

class App {
  constructor() {
    this._notes = [];
    this._isShowingArchived = false;
    this._init();
  }

  async _init() {
    // Check if user is logged in
    if (!isLoggedIn()) {
      this._renderLoginPage();
      return;
    }

    this._initEventListeners();
    await this._loadNotes();
  }

  _renderLoginPage() {
    const appBar = document.querySelector('app-bar');
    if (appBar) {
      appBar.render();
    }

    const content = document.getElementById('content');
    content.innerHTML = `
      <div class="container">
        <div class="input-section">
          <h2>Selamat Datang di Notes App</h2>
          <p>Silakan login untuk mulai menggunakan aplikasi.</p>
        </div>
      </div>
    `;
  }

  _initEventListeners() {
    document.addEventListener('refresh-notes', async () => {
      await this._loadNotes();
    });

    document.addEventListener('show-notes', () => {
      this._isShowingArchived = false;
      this._renderNotes();
    });

    document.addEventListener('show-archived', () => {
      this._isShowingArchived = true;
      this._renderNotes();
    });
  }

  async _loadNotes() {
    try {
      const data = await getNotes();
      if (data && data.notes) {
        this._notes = data.notes;
        this._renderNotes();
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  }

  _renderNotes() {
    const notesElement = document.getElementById('notes');
    const archivedNotesElement = document.getElementById('archived-notes');

    if (!notesElement || !archivedNotesElement) return;

    const activeNotes = this._notes.filter(note => !note.archived);
    const archivedNotes = this._notes.filter(note => note.archived);

    notesElement.notes = activeNotes;
    archivedNotesElement.notes = archivedNotes;
  }
}

export default App;