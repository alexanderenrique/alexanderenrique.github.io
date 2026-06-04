# Denton Works Blog

A modern, stylish blog about wrenching, coding, and microelectronics projects built with [11ty](https://www.11ty.dev/).

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run serve

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── _includes/          # Reusable components
├── _layouts/           # Page templates
│   ├── base.njk       # Main layout
│   └── page.njk       # Content page layout
├── assets/            # Static assets (images, models, etc.)
├── styles/            # CSS files
├── js/                # JavaScript files
├── coding/            # Coding projects
├── wrenching/         # Wrenching projects
├── microelectronics/  # Electronics projects
├── general/           # General content
└── index.md           # Homepage
```

## 🎨 Features

- **Modern Design**: Clean, responsive design with smooth animations
- **Fast Performance**: Static site generation with 11ty
- **Mobile First**: Responsive design that works on all devices
- **Dark Mode**: Automatic dark mode support
- **Code Highlighting**: Syntax highlighting for code blocks
- **Interactive Elements**: Hover effects, smooth scrolling, and animations

## 🛠️ Development

The site uses:
- **11ty** for static site generation
- **Nunjucks** for templating
- **CSS Grid & Flexbox** for layout
- **Vanilla JavaScript** for interactivity
- **Luxon** for date formatting

## 📝 Adding Content

1. Create a new `.md` file in the appropriate directory
2. Add frontmatter with `layout: page` and other metadata
3. Write your content in Markdown
4. The site will automatically rebuild and refresh

## 🚀 Deployment

The site builds to the `_site` directory. You can deploy this to any static hosting service like:
- GitHub Pages
- Netlify
- Vercel
- AWS S3

## 📦 Open-source hardware & software

Hardware project pages link to GitHub repos, firmware, and PCB files. Source URLs live in one place:

- `src/_data/sources.js`

### Add a new project

1. Add repo, PCB, and firmware URLs to `src/_data/sources.js`.
2. Add (or update) a page under `src/projects/` describing the project.
3. Add links on the relevant page(s) and on `src/source/index.njk`.
4. Optionally add a CTA on `src/index.md`.

## 📄 License

MIT License - see LICENSE file for details.