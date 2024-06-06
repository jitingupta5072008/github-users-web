// Import necessary modules from React, axios, and MUI (Material-UI)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, List, ListItem, ListItemText, Box, ListItemAvatar, Avatar, Typography } from '@mui/material';
import Highlighter from 'react-highlight-words';
import loader from '../Animation - 1717653855686 (1).gif';

// Function to create avatar initials from a name
function stringAvatar(name) {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

// Main Posts component
const Posts = () => {
  // Declare state variables
  const [posts, setPosts] = useState([]); // State to store all posts
  const [filteredPosts, setFilteredPosts] = useState([]); // State to store filtered posts
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
  const [loading, setLoading] = useState(true); // State to indicate loading status

  // useEffect to fetch data from API when the component mounts
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setPosts(response.data); // Set posts with data from API
        setFilteredPosts(response.data); // Set filteredPosts with data from API
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error("Error fetching data: ", error); // Log any error during fetching
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  // useEffect to filter posts based on the search term
  useEffect(() => {
    const results = posts.filter(post =>
      post.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.phone?.split('-').join('').toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.email?.split('-').join('').toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.company.name?.split('-').join('').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results); // Update filteredPosts with the filtered results
  }, [searchTerm, posts]);

  // Function to handle changes in the search input field
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update searchTerm state with the input value
  };

  // Return a loading indicator if data is still being fetched
  if (loading) {
    return <>
    <div className='imgDiv'>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh', 
        }}
        >
        <img src={loader} alt='Loading...' className='loader' />
      </Box>
    </div>
    </>
  }

  // Render the main component UI
  return (
    <div>
      <TextField label="Search users" variant="outlined" fullWidth margin="normal" value={searchTerm} onChange={handleSearchChange} />
      {filteredPosts.length === 0 ? (
        <div className='notfound'>
        <h1 className='errorEmoji'>4😮4</h1>
        <h2 className='errorEmoji'>
          NOT FOUND
        </h2>
        </div>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {filteredPosts.map(post => (
            <ListItem alignItems="flex-start" sx={{ boxShadow: '10px 10px 20px #babecc, -10px -10px 20px #ffffff', marginBottom: 2, borderRadius: 2, }} key={post.id}>
              <ListItemAvatar>
                <Avatar {...stringAvatar(post.name)} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Highlighter
                    highlightClassName='highlight'
                    searchWords={[searchTerm]}
                    autoEscape={true}
                    textToHighlight={post.name}
                  />
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >{
                        <Highlighter
                          highlightClassName='highlight'
                          searchWords={[searchTerm]}
                          autoEscape={true}
                          textToHighlight={post.username}
                        />
                      }</Typography>
                    <Typography variant='subtitle2' >
                      <Highlighter
                        highlightClassName='highlight'
                        searchWords={[searchTerm]}
                        autoEscape={true}
                        textToHighlight={`email: ${post.email}`}
                      />
                    </Typography>
                    <Typography variant='subtitle2' > <Highlighter
                      highlightClassName='highlight'
                      searchWords={[searchTerm]}
                      autoEscape={true}
                      textToHighlight={`phone: ${post.phone}`}
                    /></Typography>
                    <Typography variant='subtitle2' > <Highlighter
                      highlightClassName='highlight'
                      searchWords={[searchTerm]}
                      autoEscape={true}
                      textToHighlight={`city: ${post.address.city}`}
                    /></Typography>
                    <Typography variant='subtitle2' > <Highlighter
                      highlightClassName='highlight'
                      searchWords={[searchTerm]}
                      autoEscape={true}
                      textToHighlight={`company: ${post.company.name}`}
                    /></Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

// Export the Posts component as the default export
export default Posts;
