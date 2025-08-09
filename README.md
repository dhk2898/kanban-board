# Kanban Board
Kanban board built with React, TypeScript, and Supabase for authentication and real-time data storage.
Users can create lists and tasks, drag-and-drop to reorder, edit details like descriptions, priorities, and due dates, and have all changes automatically synced to Supabase.

# Features
User Accounts: Secure registration and login via Supabase Auth

Board Management: Each user gets their own personal board

List & Task Creation: Add, edit, and delete items instantly

Drag & Drop: Smooth reordering of tasks and lists using @hello-pangea/dnd

Real-Time Sync: All updates persist to Supabase in the background

Theming: Light/dark mode toggle with context-based state

# Tech Stack
Frontend: React + TypeScript + Vite

State Management: React Context + Reducer pattern

Backend: Supabase (PostgreSQL + Auth)

Styling: CSS Modules / Custom styles

Drag & Drop: @hello-pangea/dnd


# Future Additions: 
Audit-Log tracking changes across tasks

Improved UX for card editing

