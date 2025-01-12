# Bluesight Explorer

[![Build and Deploy](https://github.com/bluesightai/explorer/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/bluesightai/explorer/actions/workflows/build-and-deploy.yml)

This is a web application for exploring satellite imagery and performing visual search using AI. Users can search for specific objects or features (like "solar panels" or "blue cars") either by text query or by selecting example locations on a map, with results displayed as a heatmap and individual tile markers. The app integrates with Google Maps for visualization, uses Supabase for backend storage and querying, and implements features like similarity search, negative example filtering, and interactive result browsing.

![](https://github.com/user-attachments/assets/9446b526-5bf5-4a8d-9a3b-28dcaacc0ea1)

## How to Run

1. Create `.env` file with required Google Maps credentials:

```
VITE_GOOGLE_MAPS_API_KEY="your-api-key-here"
VITE_GOOGLE_MAP_ID="your-map-id-here"
```

2. Install dependencies and start dev server:

```bash
bun install

bun run dev
```

3. For production build:

```bash
bun run build
```
