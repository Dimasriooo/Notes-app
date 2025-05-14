import { getNotes, addNote, deleteNote, archiveNote, isLoggedIn } from './data/api';
import './components/app-bar';
import './components/loading-indicator';
import './components/note-list';
import './components/add-note';
import Swal from 'sweetalert2';
import './components/loading-indicator';

class App {
  constructor() {
    this._notes = [];
    this._isShowingArchived = false;
    this._init();
  }

  async _init() {
    if (!isLoggedIn()) {
      this._renderLoginPage();
      return;
    }
    this._initEventListeners();
    await this._loadNotes();
  }

  _initEventListeners() {
    document.addEventListener('refresh-notes', () => this._loadNotes());
    document.addEventListener('show-notes', () => {
      this._isShowingArchived = false;
      this._renderNotes();
    });
    document.addEventListener('show-archived', () => {
      this._isShowingArchived = true;
      this._renderNotes();
    });
    document.addEventListener('archive-note', async (e) => {
      await archiveNote(e.detail.id);
      await this._loadNotes();
    });
  }

  async _loadNotes() {
    const loader = document.querySelector('loading-indicator');
    try {
      loader.show();
      const data = await getNotes();
      this._notes = data?.notes || [];
      this._renderNotes();
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    } finally {
      loader.hide();
    }
  }

  _renderNotes() {
    const activeNotes = this._notes.filter(note => !note.archived);
    const archivedNotes = this._notes.filter(note => note.archived);
    
    document.getElementById('notes').notes = activeNotes;
    document.getElementById('archived-notes').notes = archivedNotes;
  }
}

new App();