// Complete the Index page component here
// Use chakra-ui
import { Box, Input, Button, Text, Image, VStack, HStack } from '@chakra-ui/react';
import { useState } from 'react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [songData, setSongData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_AUTH_TOKEN}`
      }
    });
    const data = await response.json();
    setSongData(data.tracks.items[0]);
    setLoading(false);
  };

  return (
    <VStack spacing={4} align="center" justify="center" height="100vh">
      <Text fontSize="2xl" fontWeight="bold">Spotify Song Search</Text>
      <Input placeholder="Enter a song name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <Button onClick={handleSearch} isLoading={loading}>Search</Button>
      {songData && (
        <Box>
          <Text fontSize="xl">{songData.name} by {songData.artists.map(artist => artist.name).join(', ')}</Text>
          <Image src={songData.album.images[0].url} alt="Album cover" />
          <audio controls src={songData.preview_url}>Your browser does not support the audio element.</audio>
        </Box>
      )}
    </VStack>
  );
};

export default Index;