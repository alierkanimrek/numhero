# numhero

A numerology companion app for calculating and comparing personal numerology charts based on Vedic numerology principles.

Enter a person's full name and birth date to instantly generate their **Ana Kulvar** (vowel path), **Yan Kulvar** (consonant path), **Fon Kulvar** (full name path), **Pin Code**, **Life Purpose**, and **Life Tree**. The **Synastry** page compares two people's charts side by side and calculates a shared life path number.

All data is stored locally in the browser — no server, no account required.

---

## Deploy to GitHub Pages

### 1. Create a GitHub repository

- Go to [github.com](https://github.com) → **New repository**
- Name it exactly: `numhero`
- Set to **Public**
- Do not initialize with README

### 2. Upload the source code

Unzip `numhero-source.zip`, open a terminal inside the folder, then:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/numhero.git
git branch -M main
git push -u origin main
```

### 3. Install the deploy tool and publish

```bash
npm install
npm install -g gh-pages
npm run build
gh-pages -d dist
```

This pushes the built app to a `gh-pages` branch automatically.

### 4. Enable GitHub Pages

- Go to your repository on GitHub
- **Settings** → **Pages**
- Under **Source**, select **Deploy from a branch**
- Branch: `gh-pages` / folder: `/ (root)`
- Click **Save**

### 5. Access your app

After 1–2 minutes your app will be live at:

```
https://YOUR_USERNAME.github.io/numhero/
```

---

## Local development

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173/numhero/`
