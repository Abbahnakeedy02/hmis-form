# HMIS Monthly Report Form

Health Facility Monthly Report — Digital Data Capture System  
Built for Nigerian health facilities reporting to DHIS2.

## Features

- 182 indicators across 25 sections
- Facility search dropdown
- Upload JSON → auto-fill form
- AI-powered anomaly detection
- Export clean JSON for DHIS2 submission
- Works on mobile and desktop

## Live Link

After deploying, your form will be available at:  
`https://abbahnakeedy02.github.io/hmis-form/`

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to GitHub Pages

Push to the `main` branch — GitHub Actions builds and deploys automatically.  
No manual steps needed after the first setup.

## First-Time GitHub Pages Setup

1. Go to your repository → **Settings → Pages**  
2. Under **Source** select **GitHub Actions**  
3. Push any change to `main`  
4. Wait ~2 minutes for the first build  
5. Your link appears at the top of the Pages settings

## Changing the Repository Name

If your GitHub repository is named something other than `hmis-form`,  
open `vite.config.js` and change:

```js
base: '/hmis-form/'
```

to match your repository name exactly. Then push again.
