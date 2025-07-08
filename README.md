# My Anime Tracker

A simple and elegant web application to track the anime you are currently watching. Manage your watchlist, check off episodes, and get new recommendations powered by the Google Gemini API.

![My Anime Tracker Screenshot](https://storage.googleapis.com/proudcity/me/my-anime-tracker-screenshot.png)

## ✨ Key Features

- **Manage Your Watchlist**: Easily add, edit, and delete anime from your list.
- **Track Episode Progress**: Mark individual episodes as watched and see your progress at a glance.
- **Visual Progress Bar**: A sleek, color-coded progress bar for each anime.
- **Dynamic Filtering & Sorting**:
    - Filter your list by status: `All`, `Watching`, `Completed`, or `Plan to Watch`.
    - Sort your list by `Title (A-Z, Z-A)` or by `Progress`.
- **Live Search**: Instantly find anime in your watchlist by title.
- **AI-Powered Recommendations**: Get personalized anime suggestions from Google's Gemini API based on your current list.
- **Modern & Responsive UI**: A beautiful dark-mode interface that works seamlessly on desktop and mobile devices.
- **Persistent Storage**: Your watchlist is saved to a Supabase backend, so you'll never lose your data.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database**: [Supabase](https://supabase.io/)
- **AI Services**: [Google Gemini API](https://ai.google.dev/)
- **Dependencies**: Loaded via ES Modules from `esm.sh` (no local `node_modules` folder).

## 🚀 Getting Started

To run this project locally, you'll need to configure a few environment variables for it to connect to the necessary services.

### 1. Prerequisites

- A [Supabase](https://supabase.io/) account for the database.
- An [API Key for the Gemini API](https://aistudio.google.com/app/apikey) from Google AI Studio.

### 2. Setting up Supabase

1.  **Create a new Supabase Project**: Go to your Supabase dashboard and create a new project.
2.  **Get API Credentials**: In your project's settings, go to the "API" section and find your **Project URL** and **`anon` public key**.
3.  **Create the `animes` Table**: Go to the "SQL Editor" in your Supabase project dashboard and run the following SQL script to create the table and its access policies.

    ```sql
    -- 1. Create the table
    create table public.animes (
      id uuid default gen_random_uuid() primary key,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      title text not null,
      image_url text,
      total_episodes integer not null default 12,
      watched_episodes integer[] default '{}'::integer[] not null
    );

    -- 2. Enable Row Level Security (RLS)
    alter table public.animes enable row level security;

    -- 3. Create policies for public access (for this demo app).
    -- In a real production app, you would scope these policies to authenticated users.

    create policy "Public animes are viewable by everyone."
      on public.animes for select
      using ( true );

    create policy "Anyone can insert animes."
      on public.animes for insert
      with check ( true );

    create policy "Anyone can update their own animes."
      on public.animes for update
      using ( true );

    create policy "Anyone can delete their own animes."
      on public.animes for delete
      using ( true );
    ```

### 3. Running the Application

This project is designed to be run in a web development environment that supports setting environment variables.

1.  **Set Environment Variables**: You must configure the following environment variables in your deployment or development environment.

    -   `SUPABASE_URL`: Your Supabase project URL.
    -   `SUPABASE_ANON_KEY`: Your Supabase `anon` public key.
    -   `API_KEY`: Your Google Gemini API key.

2.  **Serve the Files**: Serve the `index.html` and other project files using a static file server. The application will initialize using these environment variables.

> **Note**: The app checks for the Supabase variables on startup. If they aren't configured, it will display a configuration error message instead of loading the tracker. The Gemini API key is required for the recommendation feature.

## 🕹️ How to Use

1.  **Add an Anime**: Click the "Add Anime" button. Fill in the title, total episodes, and an optional image URL.
2.  **Track Progress**: On each anime card, click the episode numbers to mark them as watched. The progress bar will update automatically.
3.  **Edit or Delete**: Hover over an anime card to reveal the edit and delete icons.
4.  **Get a Recommendation**: Click the "Suggest Anime" button. The app will send your current anime list to the Gemini API and show you a recommendation.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
