import { config, fields, collection } from '@keystatic/core';

export default config({
  // Mode Lokal: File akan langsung disimpan/diedit di dalam folder laptopmu
  storage: {
    kind: 'local',
  },
  
  // Konfigurasi antarmuka CMS
  ui: {
    brand: { name: 'Alvito.dev Command Center' },
  },

  collections: {
    // ---------------------------------------------------------
    // 1. WORKS (Portofolio & Studi Kasus)
    // Format: Folder bundle (src/content/work/nama-project/index.mdx)
    // ---------------------------------------------------------
    work: collection({
      label: 'Works / Portofolio',
      slugField: 'title',
      path: 'src/content/work/*/', // Tanda /*/ berarti dia bikin folder baru untuk tiap project
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Judul Project' } }),
        description: fields.text({ label: 'Deskripsi Singkat', multiline: true }),
        publishDate: fields.date({ label: 'Tanggal Publish', defaultValue: { kind: 'today' } }),
        updatedDate: fields.date({ label: 'Tanggal Diperbarui (Opsional)' }),
        
        status: fields.select({
          label: 'Status Project',
          defaultValue: 'completed',
          options: [
            { label: 'Selesai (Completed)', value: 'completed' },
            { label: 'Sedang Berjalan (In Progress)', value: 'in-progress' },
            { label: 'Dikelola (Maintained)', value: 'maintained' },
          ],
        }),

        heroImage: fields.image({
          label: 'Gambar Utama (Hero)',
          directory: 'public/images/works', // Tempat nyimpen gambar fisiknya
          publicPath: '/images/works/',     // URL path di Astro
        }),

        repoLink: fields.url({ label: 'Link Repository GitHub (Opsional)' }),
        demoLink: fields.url({ label: 'Link Demo Website (Opsional)' }),
        
        techStack: fields.array(
          fields.text({ label: 'Nama Teknologi (cth: Astro, React)' }),
          { label: 'Tech Stack', itemLabel: props => props.value }
        ),
        
        tags: fields.array(
          fields.text({ label: 'Tag (cth: UI/UX, Web App)' }),
          { label: 'Tags', itemLabel: props => props.value }
        ),

        // UBAH: Menggunakan mdx agar disave sebagai .mdx
        content: fields.mdx({ label: 'Isi Konten (Markdown/MDX)' }),
      },
    }),

    // ---------------------------------------------------------
    // 2. WRITING (Artikel Blog)
    // Format: Folder bundle (src/content/writing/judul-artikel/index.mdx)
    // ---------------------------------------------------------
    writing: collection({
      label: 'Writing / Artikel',
      slugField: 'title',
      path: 'src/content/writing/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Judul Artikel' } }),
        description: fields.text({ label: 'Deskripsi / Excerpt', multiline: true }),
        publishDate: fields.date({ label: 'Tanggal Publish', defaultValue: { kind: 'today' } }),
        
        heroImage: fields.image({
          label: 'Cover Artikel (Opsional)',
          directory: 'public/images/writing',
          publicPath: '/images/writing/',
        }),

        tags: fields.array(
          fields.text({ label: 'Kategori / Tag' }),
          { label: 'Tags', itemLabel: props => props.value }
        ),

        // UBAH: Menggunakan mdx
        content: fields.mdx({ label: 'Isi Artikel' }),
      },
    }),

    // ---------------------------------------------------------
    // 3. NOTES (Catatan Singkat / TIL)
    // Format: File tunggal (src/content/notes/judul-note.mdx)
    // ---------------------------------------------------------
    notes: collection({
      label: 'Notes / TIL',
      slugField: 'title',
      path: 'src/content/notes/*', // Tanda /* berarti dia cuma bikin 1 file
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Judul Catatan' } }),
        publishDate: fields.date({ label: 'Tanggal', defaultValue: { kind: 'today' } }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: props => props.value }
        ),
        // UBAH: Menggunakan mdx
        content: fields.mdx({ label: 'Isi Catatan' }),
      },
    }),

    // ---------------------------------------------------------
    // 4. FEED (Microblogging / Status Update)
    // Format: File tunggal berbasis tanggal
    // ---------------------------------------------------------
    feed: collection({
      label: 'Feed / Microblog',
      slugField: 'title',
      path: 'src/content/feed/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'ID Unik / Slug (cth: 2024-10-24-update)' } }),
        publishDate: fields.datetime({ label: 'Waktu Post', defaultValue: { kind: 'now' } }),
        // UBAH: Menggunakan mdx
        content: fields.mdx({ label: 'Isi Status (Mendukung Teks & Link)' }),
      },
    }),
  },
});