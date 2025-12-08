# 🚀 Alvito.dev - Personal Website (Astro + CI/CD)

Selamat datang di *source code* resmi untuk **alvito.dev**, di-*host* melalui GitHub Pages dengan *custom domain*. Proyek ini direkayasa ulang dari HTML statis manual ke *Static Site Generator* modern, **Astro**, untuk mencapai kecepatan dan modularitas terbaik, terinspirasi dari desain *Bento Box* (enscribe.dev) dan struktur artikel kustom (shubhamjain.co).

## 🛠️ Tech Stack & Arsitektur

* **Framework:** Astro (Static Site Generator)
* **Styling:** Tailwind CSS (untuk utilitas styling yang cepat)
* **Interaktivitas:** React (digunakan sebagai "Astro Islands" untuk widget dinamis seperti status Discord atau feed Twitter).
* **CI/CD:** GitHub Actions (Otomatisasi Build & Deployment).
* **Template Base:** Astro Erudite (modifikasi berat)

---

## 🌳 Organisasi Konten (Content Collections)

Semua konten blog, proyek, dan data pendukung lainnya dikelola melalui [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/), memastikan *type-safety* dan konsistensi data.

### 1. `src/content/blog/`

Tempat semua artikel (writing) Anda berada.

* **Format:** File Markdown (`.md` atau `.mdx`).
* **Rencana Kategori:** Kategori akan ditentukan melalui *frontmatter* untuk implementasi tab di halaman **`/writing`** (Technical, Opinions, Featured).

### 2. `src/content/projects/`

Tempat semua deskripsi *side project* dan karya Anda, termasuk rincian proyek Arduino.

* **Fungsi:** Menyimpan metadata proyek (judul, deskripsi, *link* GitHub/Demo, penghargaan).

### 3. `src/content/authors/`

Data penulis (terutama untuk diri Anda sendiri) dan informasi kontak singkat.

---

## 🗺️ Struktur Routing (URL)

Struktur URL diatur berdasarkan tata letak berbasis file (`src/pages/`) dan *Dynamic Routing* untuk artikel.

| Path Tujuan | Deskripsi & Implementasi |
| :--- | :--- |
| **`/`** | **Home Page (Bento Box Layout).** Tujuannya adalah menampilkan profil singkat dan *widget* dinamis dari berbagai *Content Collection* (Proyek terbaru, *Blog Post* terbaru, *Live Status*). |
| **`/writing`** | Halaman indeks untuk semua artikel. Akan menggunakan tab untuk memfilter kategori (Opinions, Technical, Featured), diimplementasikan menggunakan **React Island**. |
| **`/projects`** | Halaman indeks untuk semua proyek Anda. |
| **`/YYYY/MM/DD/slug`** | **Routing Kustom (Shubham Jain Inspired).** URL *single post* akan dibuat berdasarkan tanggal publikasi, diatur melalui `getStaticPaths` di *route* blog utama. |
| **`/cv`** / **`/discord`** | Dipertahankan. Ini adalah *shortcut* ke file HTML statis lama di folder `public/`. |
| **`/app/kowlastory`** | **Dipertahankan.** Ini adalah *link* penting (QR Code) dan harus tetap berfungsi. File berada di `public/app/kowlastory/`. |

---

## ⚙️ Workflow Pengembangan dan Deployment (CI/CD)

Proyek ini menggunakan strategi *branching* yang bersih:

1.  **`dev` Branch (Source):** Cabang ini menampung **SELURUH *source code* Astro** (file `.astro`, `.ts`, `src/content`, `package.json`, dll.).
2.  **`main` Branch (Deployment):** Cabang ini hanya menampung **hasil *build*** (isi dari folder `dist/` yang hanya berisi HTML/CSS/JS).

### Otomatisasi dengan GitHub Actions

Setiap kali ada perubahan di-*push* ke *branch* `dev`, *workflow* CI/CD akan berjalan secara otomatis:

1.  **Trigger:** `git push origin dev`
2.  **Aksi:** GitHub Actions menjalankan `npm install` -> `npm run build`.
3.  **Deployment:** Hasil *build* (`dist/`) di-*deploy* secara otomatis, menimpa *branch* `main`.

**Cara Kerja Lokal:**

```bash
# 1. Pindah ke branch development
git checkout dev

# 2. Jalankan server lokal saat mengedit
npm run dev

# 3. Commit dan push ketika selesai
git add .
git commit -m "feat: [Fitur Baru] Deskripsi singkat"
git push origin dev 
# GitHub Actions akan otomatis mengurus deployment ke alvito.dev