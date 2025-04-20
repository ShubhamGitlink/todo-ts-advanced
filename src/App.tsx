import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Container, Box, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import HomePage from './pages/HomePage'
import TodoApp from './pages/TodoApp'
import CompletedTasks from './pages/CompletedTasks'

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                TodoList App
              </Typography>
              <Button component={Link} to="/" color="inherit">Home</Button>
              <Button component={Link} to="/todos" color="inherit">Todo App</Button>
              <Button component={Link} to="/completed" color="inherit">Completed Tasks</Button>
            </Toolbar>
          </AppBar>

          <Container sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/todos" element={<TodoApp />} />
              <Route path="/completed" element={<CompletedTasks />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App
