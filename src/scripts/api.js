// const BASE_URL = "https://notes-api.dicoding.dev/v2";

// export const getActiveNotes = async () => {
//   const response = await fetch(`${BASE_URL}/notes`);
//   const { data } = await response.json();
//   return data;
// };

// export const addNote = async ({ title, body }) => {
//   const response = await fetch(`${BASE_URL}/notes`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ title, body }),
//   });
//   return response.json();
// };

// export const deleteNote = async (id) => {
//   await fetch(`${BASE_URL}/notes/${id}`, { method: "DELETE" });
// };

const BASE_URL = "https://notes-api.dicoding.dev/v2";

// 1. Fungsi GET: Ambil semua catatan
export const getActiveNotes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    if (!response.ok) throw new Error("Gagal mengambil data");
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error getActiveNotes:", error);
    throw error; // Lempar error ke file app.js
  }
};

// 2. Fungsi POST: Tambah catatan baru
export const addNote = async ({ title, body }) => {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });
    if (!response.ok) throw new Error("Gagal menambahkan catatan");
    return await response.json();
  } catch (error) {
    console.error("Error addNote:", error);
    throw error;
  }
};

// 3. Fungsi DELETE: Hapus catatan
export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Gagal menghapus catatan");
  } catch (error) {
    console.error("Error deleteNote:", error);
    throw error;
  }
};

export const archiveNote = async (id) => {
  await fetch(`${BASE_URL}/notes/${id}/archive`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
};