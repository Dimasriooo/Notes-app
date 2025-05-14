const BASE_URL = "https://notes-api.dicoding.dev/v2";

export const isLoggedIn = () => {
  // Implementasi login (sesuaikan dengan autentikasi Dicoding)
  return localStorage.getItem('accessToken') !== null;
};

export const getNotes = async () => {
    const loader = document.querySelector('loading-indicator');
    try {
      loader.show(); // Tampilkan loading
      const response = await fetch(`${BASE_URL}/notes`);
      if (!response.ok) throw new Error("Gagal memuat data");
      return await response.json();
    } finally {
      loader.hide(); // Sembunyikan loading
    }
  };

export const addNote = async ({ title, body }) => {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({ title, body })
  });
  return response.json();
};

export const deleteNote = async (id) => {
  await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
};