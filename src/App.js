import React from 'react'; // Import React to enable the creation of React components
import { Container, Typography } from '@mui/material'; // Import specific components from the MUI library
import Navbar from './components/Navbar'; // Import the Navbar component from the local components directory
import Posts from './components/Posts'; // Import the Posts component from the local components directory
import './App.css'; // Import the CSS file for styling the App component

// Define the main App component
function App() {
  return (
    <> 
      {/* Fragment shorthand, used to group multiple elements without adding extra nodes to the DOM */}
      <Navbar /> 
      {/* Render the Navbar component */}
      <Container>
        {/* MUI Container component to provide a layout container for the content */}
        <Typography 
          variant="h4" // Set the variant to h4 to style the text
          gutterBottom // Add bottom margin to the typography component
          sx={{
            display: 'flex', // Use flexbox for layout
            justifyContent: 'center', // Center the content horizontally
            alignItems: 'center', // Center the content vertically
            margin: 1, // Add margin to the typography component
          }}
        >
          Github Users
          {/* Display the text "Github Users" */}
        </Typography>
        <Posts />
        {/* Render the Posts component */}
      </Container>
    </>
  );
}

export default App; // Export the App component as the default export
