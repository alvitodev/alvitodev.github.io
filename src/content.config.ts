import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders' // Pastikan import ini ada untuk Astro v5

// 1. Koleksi WRITING
const writing = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
    // Pastikan ada ({ image }) di sini 👇
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		
        // Pastikan pakai image() di sini 👇
        heroImage: image().optional(), 
        // Jika file lama pakai 'banner', handle juga:
        banner: image().optional(),

		tags: z.array(z.string()).optional(),
		isFeatured: z.boolean().default(false),
		category: z.enum(['technical', 'opinion', 'tutorial']).default('technical'),
	}),
});

// 2. NOTES (TIL, Ide Kasar)
const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
})

// 3. WORK (Proyek & Studi Kasus)
const work = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
    // Pastikan ada ({ image }) di sini 👇
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date(),
		
        // Pastikan pakai image() di sini 👇
        heroImage: image().optional(),
        
		techStack: z.array(z.string()).default([]),
		repoLink: z.string().url().optional(),
		demoLink: z.string().url().optional(),
		status: z.enum(['completed', 'in-progress', 'maintained']).default('completed'),
	}),
});

// 4. FEED (Microblogging/Status)
const feed = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/feed' }),
  schema: z.object({
    publishDate: z.coerce.date(),
    image: z.string().optional(),
    spotifyEmbed: z.string().optional(),
  }),
})

// 5. LIBRARY (Data JSON untuk Buku/Film)
const library = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/library' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    type: z.enum(['book', 'movie', 'tv', 'game']),
    status: z.enum([
      'finished',
      'reading',
      'watching',
      'playing',
      'dropped',
      'wishlist',
    ]),
    rating: z.number().min(0).max(5).optional(),
    dateFinished: z.coerce.date().optional(),
    coverImage: z.string().optional(),
    creator: z.string().optional(), // Penulis atau Sutradara
  }),
})

// 6. GALLERY (Data JSON untuk Foto)
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/gallery' }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    image: z.string(), // Path ke public folder
    dateTaken: z.coerce.date(),
    location: z.string().optional(),
    camera: z.string().optional(),
  }),
})

// 7. AUTHORS (Biarkan dulu untuk kompatibilitas template)
const authors = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/authors" }),
    schema: z.object({
        name: z.string(),
        avatar: z.string().optional(),
        about: z.string().optional(),
        email: z.string().optional(),
        // Tambahan baru untuk fix error AuthorCard:
        mail: z.string().optional(), // Kadang template pakai 'mail' bukan 'email'
        bio: z.string().optional(),
        pronouns: z.string().optional(),
        website: z.string().optional(),
        linkedin: z.string().optional(),
        twitter: z.string().optional(),
        github: z.string().optional(),
    }),
});

export const collections = {
  writing,
  notes,
  work,
  feed,
  library,
  gallery,
  authors,
}
