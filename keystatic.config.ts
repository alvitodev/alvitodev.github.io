import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'shifted-nova/shiftednova',
  },
  
  // Mendefinisikan Dashboard UI
  collections: {
    // 1. Dashboard untuk Artikel Blog (Writing)
    writing: collection({
      label: 'Writing / Blog',
      slugField: 'title',
      path: 'src/content/writing/*/', // Lokasi file .mdx disimpan
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Judul Artikel' } }),
        description: fields.text({ label: 'Deskripsi Singkat' }),
        publishDate: fields.date({ label: 'Tanggal Publish' }),
        content: fields.markdoc({ label: 'Isi Artikel' }),
      },
    }),

    // 2. Dashboard untuk Portofolio (Work)
    work: collection({
      label: 'Works / Portofolio',
      slugField: 'title',
      path: 'src/content/work/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Nama Project' } }),
        description: fields.text({ label: 'Deskripsi' }),
        techStack: fields.array(fields.text({ label: 'Teknologi' }), {
          label: 'Tech Stack',
          itemLabel: props => props.value
        }),
        heroImage: fields.image({
          label: 'Gambar Utama',
          directory: 'public/images/works',
          publicPath: '/images/works/'
        }),
        content: fields.markdoc({ label: 'Konten Case Study' }),
      },
    }),
  },
});