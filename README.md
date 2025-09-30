# Customer Support Zendesk Tracker

A Next.js demo showcasing Inkeep's AI chat integration with personalized customer support.

## Features

- **Simple Authentication**: Name/email login with localStorage persistence
- **AI Chat Integration**: Inkeep sidebar chat with user context
- **Responsive Design**: Clean UI built with Tailwind CSS

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Inkeep Widgets (AI Chat)

## Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   Create `.env.local` with your Inkeep credentials:
   ```env
   NEXT_PUBLIC_INKEEP_API_KEY=your_api_key_here
   NEXT_PUBLIC_INKEEP_GRAPH_URL=your_graph_url_here
   NEXT_PUBLIC_INKEEP_TENANT_ID=your_tenant_id_here
   NEXT_PUBLIC_INKEEP_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_INKEEP_GRAPH_ID=your_graph_id_here
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Open [http://localhost:8080](http://localhost:8080)**

## Usage

1. Enter your name and email to login
2. Click the "Ask AI" button to start chatting
3. The AI assistant has access to your user context for personalized responses

## Project Structure

```
src/
├── app/
│   ├── dashboard/page.tsx    # Dashboard page
│   ├── page.tsx             # Login page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── Login.tsx            # Authentication component
│   └── InkeepChat.tsx       # AI chat integration
└── store/
    └── useUser.ts           # User state management
```

## Development

- `pnpm dev`: Start development server (port 8080)
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint