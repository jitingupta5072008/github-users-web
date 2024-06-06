import React from 'react'; // Import React to enable the creation of React components
import { AppBar, Toolbar, Typography } from '@mui/material'; // Import specific MUI components

// Define the Navbar functional component
const Navbar = () => {
  return (
    <AppBar position="static">
      {/* MUI AppBar component to create a top navigation bar, with a static position */}
      <Toolbar>
        {/* MUI Toolbar component to group and style the content inside the AppBar */}
        <Typography variant="h6">
          {/* MUI Typography component to display text, with the variant set to h6 for styling */}
          Github Users Web App
          {/* The text to be displayed inside the AppBar */}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; // Export the Navbar component as the default export
