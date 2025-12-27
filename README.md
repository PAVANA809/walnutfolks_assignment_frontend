# Voice Agent Analytics Dashboard

This project is a React + TypeScript application built with Vite, mimicking the style of [superbryn.com](https://superbryn.com/). It features interactive charts for analyzing voice agent performance.

## Features

- **Call Duration Analysis**: An area chart showing the distribution of call durations.
- **Sad Path Analysis**: A pie chart showing the breakdown of unsuccessful calls.
- **Interactive Editing**: Click on any segment in the "Sad Path Analysis" chart to edit its value.
- **Data Persistence**:
  - Prompts for email before saving changes.
  - Saves custom values to Supabase (mocked in this demo).
  - Confirms before overwriting existing values.

## Tech Stack

- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Supabase (Client setup included)

## Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Build for production:
    ```bash
    npm run build
    ```

## Supabase Configuration

To enable real Supabase integration, create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The application expects a table named `chart_overrides` with the following columns:
- `email` (text, primary key part)
- `segment_name` (text, primary key part)
- `value` (numeric)
- `updated_at` (timestamp)
