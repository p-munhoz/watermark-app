# Watermark Tool 🔒

Modern web app to add watermarks to your PDF and image files **while keeping everything local and private**.

## ✨ Features

- 🔐 **100% private**: all processing happens in the browser
- 🚫 **No storage**: your files never leave your device
- 🎨 **Customizable**: text, opacity, size, rotation
- 📄 **Multi-format**: PDF, PNG, JPG, JPEG
- ⚡ **Fast**: instant, in-browser processing
- 🎯 **Simple**: clean, intuitive UI

## 🚀 Installation

```bash
# Clone the project (or download the files)
cd watermark-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Connect the repo or upload the .next output according to your Netlify setup
```

### Static export (GitHub Pages, etc.)

1. In `next.config.mjs`, set `output: 'export'`.
2. Run:
```bash
npm run build
# The `out` folder will contain the static site
```

## 🛠️ Tech stack

- **Next.js 14** — React framework
- **TypeScript** — static typing
- **Tailwind CSS** — styling
- **pdf-lib** — client-side PDF manipulation
- **Canvas API** — image processing

## 🔒 Security & privacy

This application ensures:

- ✅ **No backend servers**: everything is processed in your browser
- ✅ **No data stored**: files are never saved
- ✅ **No transmission**: nothing is sent over the network
- ✅ **Transparent code**: open source and reviewable

## 📝 Usage

1. **Select your file** (PDF or image)
2. **Customize the watermark** (text, opacity, size, rotation)
3. **Download** the watermarked result instantly

## 🎨 Customization

The code is modular and easy to adjust:

- **UI/UX**: edit `app/page.tsx`
- **Styles**: tweak colors in `app/globals.css`
- **Theme config**: update `tailwind.config.ts`

## 📄 License

Polyform Noncommercial License 1.0.0 — personal and other non-commercial use permitted; commercial use is prohibited. See `LICENSE` for details.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or pull request.

---

Built with ❤️ for privacy and simplicity
