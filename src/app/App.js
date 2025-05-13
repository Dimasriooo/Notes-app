class App {
    constructor() {
      this.notes = [];
      this.init();
    }
  
    init() {
      // Mendapatkan elemen-elemen yang diperlukan
      this.notesContainer = document.getElementById('notes-container');
      this.noteInput = document.getElementById('note-input');
      this.addNoteBtn = document.getElementById('add-note');
  
      // Periksa apakah elemen-elemen ditemukan
      if (!this.notesContainer) {
        console.error('Element dengan id "notes-container" tidak ditemukan');
      }
      
      if (!this.noteInput) {
        console.error('Element dengan id "note-input" tidak ditemukan');
      }
      
      if (!this.addNoteBtn) {
        console.error('Element dengan id "add-note" tidak ditemukan');
      } else {
        // Tambahkan event listener hanya jika tombol ditemukan
        this.addNoteBtn.addEventListener('click', this.addNote.bind(this));
      }
      
      // Tambahkan listener untuk form submission
      const noteForm = document.getElementById('note-form');
      if (noteForm) {
        noteForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.addNote();
        });
      }
      
      // Muat catatan yang disimpan
      this.loadNotes();
      this.renderNotes();
    }
  
    addNote() {
      const noteText = this.noteInput.value.trim();
      if (noteText !== '') {
        const note = {
          id: Date.now(),
          text: noteText,
          date: new Date().toLocaleString()
        };
        
        this.notes.push(note);
        this.saveNotes();
        this.renderNotes();
        this.noteInput.value = '';
      }
    }
  
    deleteNote(id) {
      this.notes = this.notes.filter(note => note.id !== id);
      this.saveNotes();
      this.renderNotes();
    }
  
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    }
  
    loadNotes() {
      const storedNotes = localStorage.getItem('notes');
      this.notes = storedNotes ? JSON.parse(storedNotes) : [];
    }
  
    renderNotes() {
      // Pastikan notesContainer ada sebelum mencoba merender
      if (!this.notesContainer) {
        console.error('Element dengan id "notes-container" tidak ditemukan');
        return;
      }
      
      this.notesContainer.innerHTML = '';
      
      this.notes.forEach(note => {
        if (!note || typeof note.text !== 'string' || typeof note.date !== 'string') {
          console.warn('Data catatan tidak valid:', note);
          return;
        }
        
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
          <div class="note-header">
            <small>${note.date}</small>
            <button class="delete-note" data-id="${note.id}">Hapus</button>
          </div>
          <div class="note-body">
            <p>${note.text}</p>
          </div>
        `;
        
        this.notesContainer.appendChild(noteElement);
        
        // Tambahkan event listener untuk tombol hapus
        const deleteBtn = noteElement.querySelector('.delete-note');
        if (deleteBtn) {
          deleteBtn.addEventListener('click', () => {
            this.deleteNote(note.id);
          });
        }
      });
    }
  }
  
  export default App;