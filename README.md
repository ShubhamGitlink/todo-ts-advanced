# Todo List App

A simple and intuitive Todo List application built with React, TypeScript, and Vite.

## Features

- Create and manage tasks
- Mark tasks as completed
- View your completed tasks history
- Responsive design with Material UI
- Data persistence using localStorage

## Pages

1. **Home** - Welcome page with app information
2. **Todo App** - Main page for creating and managing active tasks
3. **Completed Tasks** - Page for viewing completed tasks

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todolist-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **localStorage** - Data persistence

## Project Structure

```
/src
  /components
    TodoForm.tsx    - Form for adding new todos
    TodoItem.tsx    - Individual todo item component
    TodoList.tsx    - List of todo items
  /pages
    HomePage.tsx    - Welcome page
    TodoApp.tsx     - Main todo application
    CompletedTasks.tsx - Completed tasks view
  App.tsx           - Main app component with routing
  main.tsx          - Entry point
```

## License

MIT
