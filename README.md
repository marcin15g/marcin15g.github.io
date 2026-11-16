# marcin15g.github.io

Personal portfolio of Marcin Grzebyk, served at https://marcin15g.github.io.

Built with Next.js (App Router) as a static export and deployed to GitHub Pages
by the workflow in `.github/workflows/deploy.yml` on every push to `master`.

## Editing content

All text — about, experience, projects, skills, courses, education and links —
lives in [`content/profile.ts`](content/profile.ts). Edit it and push; the page
rebuilds automatically.

## Local development

```bash
npm ci
npm run dev     # http://localhost:3000
npm run build   # static site in ./out
```

## Structure

- `app/` — layout, page, global styles, favicon and share image
- `components/` — particle background, scroll reveal, icons
- `content/profile.ts` — page content
- `public/images/` — portrait
