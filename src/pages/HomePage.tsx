import { Link } from 'react-router-dom'
import { Typography, Button, Box, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const HomePage = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 4 }}>
        Welcome to TodoList App
      </Typography>
      <Typography variant="h6" gutterBottom color="text.secondary">
        Manage your tasks efficiently with our simple and intuitive Todo application
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, justifyContent: 'center', mt: 4 }}>
        <Button 
          component={Link} 
          to="/todos" 
          variant="contained" 
          color="primary" 
          size="large"
        >
          Get Started
        </Button>
        
        <Button 
          component={Link} 
          to="/completed" 
          variant="outlined" 
          color="primary" 
          size="large"
        >
          View Completed Tasks
        </Button>
      </Box>
      
      <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', mt: 8, p: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Features
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="success" />
            </ListItemIcon>
            <ListItemText primary="Create and manage tasks easily" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="success" />
            </ListItemIcon>
            <ListItemText primary="Mark tasks as completed" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="success" />
            </ListItemIcon>
            <ListItemText primary="View your completed tasks history" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  )
}

export default HomePage 