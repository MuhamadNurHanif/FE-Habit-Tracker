# FE-Habit-Tracker

Habit Tracker adalah aplikasi mini untuk membangun kebiasaan positif berbasis **React + Vite** dengan integrasi backend Django-Ninja.  
Proyek ini mendemonstrasikan implementasi **CRUD Todo** dengan stack modern untuk frontend.

---

## Tech Stack

- **Build Tool**: Vite
- **Framework**: React.js
- **UI**: TailwindCSS + Shadcn UI
- **Routing**: Tanstack Router
- **Forms**: React Hook Form
- **Data Fetching**: Tanstack Query (React Query)
- **Toast Notification**: Sonner
- **API Backend**: Django-Ninja (lihat repo `BE-Habit-Tracker`)
- **Database**: PostgreSQL (via backend)

---

## Struktur Direktori
```bash
FE-Habit-Tracker/
├── src/
│ ├── components/
│ │ └── ui/ 
│ ├── layouts/
│ │ └── SidebarLayout.jsx 
│ ├── pages/
│ │ ├── habits/ 
│ │ │ ├── HabitList.jsx 
│ │ │ ├── HabitForm.jsx 
│ │ │ ├── HabitDetail.jsx 
│ │ └── dashboard.jsx 
│ ├── hooks/
│ ├── services/api.js 
│ ├── lib/ 
│ ├── router/index.jsx
│ ├── App.jsx
│ └── main.jsx
```
---

## Fitur
```bash
- **List** → Menampilkan semua habit (GET /api/todos/)
- **New** → Tambah habit baru (POST /api/todos/)
- **Detail + Delete** → Lihat detail habit & hapus (GET + DELETE /api/todos/:id)
- **Edit** → Edit habit (PUT /api/todos/:id)

Semua interaksi:

- Data di-fetch menggunakan **Tanstack Query** (`useQuery`, `useMutation`)
- Refresh otomatis setelah create/update/delete via **queryInvalidation**
- Opsional **optimistic update** untuk UX lebih cepat
- Feedback menggunakan **Sonner toast dengan promise**
```
---

## Cara Menjalankan

Clone repo:

```bash
git clone https://github.com/username/FE-Habit-Tracker.git
cd FE-Habit-Tracker
npm install
npm run dev``
```
