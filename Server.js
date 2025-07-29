const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/download', async (req, res) => {
  const { url } = req.query;

  if (!url) return res.status(400).json({ success: false, message: "No URL provided." });

  try {
    const apiUrl = `https://api.giftedtech.co.ke/api/download/instadl?apikey=gifted&url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl);

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch from gifted API.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
