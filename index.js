import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.get('/address/:address', async (req, res) => {
  try {
    const address = req.params.address;
    const response = await axios.get(`https://geocode.maps.co/search?q=${encodeURIComponent(address)}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/forecast/:latitude/:longitude', async (req, res) => {
  try {
    const latitude = req.params.latitude;
    const longitude = req.params.longitude;
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
