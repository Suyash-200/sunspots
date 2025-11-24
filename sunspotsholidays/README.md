# Sunspots Holidays - Next.js Theme

Drupal 11 Next.js theme for Sunspots Holidays website. Can run standalone (without Drupal) using static JSON data.

## 🚀 Quick Start (Standalone - Without Drupal)

### Prerequisites

- Node.js 18+ and npm
- No Drupal installation required

### Setup Steps

1. **Install Dependencies**

```bash
npm install
```

2. **Configure Environment (Optional)**

Create `.env.local` file in the theme root:

```env
# Use static JSON data (default: true)
NEXT_PUBLIC_USE_MOCK_DATA=true

# Drupal API URL (not needed for standalone, but can be set for future use)
NEXT_PUBLIC_DRUPAL_API_URL=http://localhost
```

**Note:** If you don't create `.env.local`, the app will default to using static JSON data.

3. **Run Development Server**

```bash
npm run dev
```

4. **Visit the Application**

Open your browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout with Header/Footer
│   ├── page.tsx                   # Homepage (not used in Drupal mode)
│   └── page.css                   # Homepage styles
├── components/                     # React components
│   ├── App.tsx                    # Main app component (used in Drupal)
│   ├── HomeSection/               # Home section component
│   │   ├── HomeSection.tsx
│   │   └── HomeSection.css
│   ├── DestinationsGrid/          # Destinations display
│   │   ├── DestinationsGrid.tsx
│   │   └── DestinationsGrid.css
│   ├── Header/                    # Header component
│   │   ├── Header.tsx
│   │   └── Header.css
│   ├── Footer/                    # Footer component
│   │   ├── Footer.tsx
│   │   └── Footer.css
│   └── Navigation/                # Navigation component
│       ├── Navigation.tsx
│       └── Navigation.css
├── lib/                           # Utilities and helpers
│   ├── api.ts                     # API client (for Drupal)
│   ├── data.ts                    # Data loader (reads JSON)
│   ├── types.ts                   # TypeScript type definitions
│   └── scrollAnimations.ts        # Scroll animation utility
├── data/                          # Static JSON data files
│   └── sample-home-sections.json  # Homepage sections data
├── styles/                        # Global styles
│   └── globals.css                # Global CSS variables and base styles
├── entry.tsx                      # Entry point for Drupal embedding
├── webpack.config.js              # Webpack config for Drupal build
├── tsconfig.json                  # TypeScript configuration
├── next.config.js                 # Next.js configuration
└── package.json                   # Dependencies and scripts
```

## 📊 Data Structure

### Static JSON Data Location

All homepage content is stored in:
```
data/sample-home-sections.json
```

### JSON Structure

```json
{
  "data": [
    {
      "id": "1",
      "title": "Hero Section",
      "section_type": "hero",
      "paragraphs": [
        {
          "id": "1",
          "title": "hero-main",
          "body": "<h1>Your HTML Content</h1>",
          "body_format": "full_html"
        }
      ],
      "image": "https://example.com/image.jpg"
    }
  ],
  "destinations": [
    {
      "id": "dest-1",
      "title": "Bali",
      "description": "Island Paradise",
      "image": "https://example.com/bali.jpg"
    }
  ]
}
```

### Key Points

- **Paragraph `title`**: Used as CSS identifier (not displayed on frontend)
- **Paragraph `body`**: Full HTML content that gets rendered
- **Section `section_type`**: Used for CSS class names (e.g., `home-section--hero`)
- **Destinations**: Separate array in JSON for destinations grid

### Editing Content

1. Open `data/sample-home-sections.json`
2. Edit the HTML in paragraph `body` fields
3. Add/modify sections as needed
4. Save the file
5. Refresh your browser (Next.js hot reload will pick up changes)

## 🎨 Features

✅ **Standalone Mode** - Run without Drupal using static JSON  
✅ **Paragraph-based Content** - Multiple content sections per home section  
✅ **Full HTML Support** - Rich content in body fields  
✅ **Scroll Animations** - Smooth fade-in animations on scroll  
✅ **Responsive Design** - Mobile-first, works on all devices  
✅ **TypeScript** - Type safety throughout  
✅ **Hot Reload** - Instant updates during development  

## 🛠️ Available Scripts

### Development

```bash
# Start Next.js development server (standalone)
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint
```

### Production Build

```bash
# Build Next.js app (standalone)
npm run build

# Start production server
npm start
```

### Drupal Integration Build

```bash
# Build React app for Drupal embedding
npm run build:drupal

# Build both Next.js and Drupal versions
npm run build:all
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` in the theme root:

```env
# Use static JSON data (true) or Drupal API (false)
NEXT_PUBLIC_USE_MOCK_DATA=true

# Drupal API base URL (only needed if USE_MOCK_DATA=false)
NEXT_PUBLIC_DRUPAL_API_URL=http://localhost
```

### Data Source Selection

The app automatically uses:
- **Static JSON** when `NEXT_PUBLIC_USE_MOCK_DATA=true` (default)
- **Drupal API** when `NEXT_PUBLIC_USE_MOCK_DATA=false`

## 📝 Adding New Sections

1. **Add to JSON** (`data/sample-home-sections.json`):

```json
{
  "id": "10",
  "title": "New Section",
  "section_type": "new_section",
  "paragraphs": [
    {
      "id": "50",
      "title": "new-section-main",
      "body": "<h2>New Section Title</h2><p>Content here</p>",
      "body_format": "full_html"
    }
  ]
}
```

2. **Add CSS** (`components/HomeSection/HomeSection.css`):

```css
.home-section--new_section {
  background: var(--bg-white);
  padding: 5rem 0;
}

.home-section__paragraph--new-section-main {
  /* Your styles */
}
```

3. **Render in App** (`components/App.tsx`):

```tsx
{renderSection('new_section')}
```

## 🎯 CSS Class Naming Convention

- **Section**: `.home-section--{section_type}`
- **Paragraph**: `.home-section__paragraph--{paragraph_title}`
- **Example**: `.home-section--hero .home-section__paragraph--hero-main`

## 📦 Dependencies

### Production
- `next` - Next.js framework
- `react` - React library
- `react-dom` - React DOM rendering
- `axios` - HTTP client (for Drupal API)

### Development
- `typescript` - TypeScript compiler
- `webpack` - Module bundler (for Drupal build)
- `ts-loader` - TypeScript loader for webpack
- `css-loader` - CSS loader for webpack
- `mini-css-extract-plugin` - Extract CSS to separate file

## 🚀 Deployment (Standalone)

### Build for Production

```bash
npm run build
```

### Deploy Options

1. **Vercel** (Recommended for Next.js)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Connect your repository
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Static Export** (if needed)
   - Update `next.config.js` to add `output: 'export'`
   - Run `npm run build`
   - Deploy the `out` folder

## 🔄 Switching to Drupal Mode

When ready to integrate with Drupal:

1. Set `NEXT_PUBLIC_USE_MOCK_DATA=false` in `.env.local`
2. Set `NEXT_PUBLIC_DRUPAL_API_URL` to your Drupal site URL
3. Run `npm run build:drupal` to create Drupal-compatible bundle
4. The bundle will be in `dist/react-app.js` and `dist/react-app.css`

## 📚 Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **TypeScript Docs**: https://www.typescriptlang.org/docs

## ⚠️ Important Notes

- Paragraph `title` field is **identifier only** (not displayed on frontend)
- Only the `body` content is rendered
- Environment variables must be prefixed with `NEXT_PUBLIC_` to be available in browser
- JSON data is loaded at build time (for static export) or runtime (for dev server)
- All images should use absolute URLs or be placed in `public/` folder

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is taken:
```bash
# Use a different port
npm run dev -- -p 3001
```

### TypeScript Errors

```bash
# Check for type errors
npm run type-check
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📄 License

Private project for Sunspots Holidays.
