import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { storage } from './server/storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', async (req, res) => {
  try {
    const countries = await storage.getCountries();
    const selectedCountry = req.query.country || 'IN';
    const activeSection = req.query.section || 'instruments';
    const searchQuery = req.query.search || '';

    let data = {};
    const country = await storage.getCountry(selectedCountry);

    switch (activeSection) {
      case 'instruments':
        data.instruments = await storage.getFinancialInstruments(selectedCountry);
        data.recommendations = await storage.getRecommendations(selectedCountry);
        break;
      case 'savings':
        data.schemes = await storage.getSavingsSchemes(selectedCountry);
        break;
      case 'tax':
        data.regulations = await storage.getTaxRegulations(selectedCountry);
        break;
    }

    res.render('index', {
      countries,
      selectedCountry,
      country,
      activeSection,
      searchQuery,
      data
    });
  } catch (error) {
    console.error('Error loading homepage:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API Routes for AJAX requests
app.get('/api/countries', async (req, res) => {
  try {
    const countries = await storage.getCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch countries' });
  }
});

app.get('/api/countries/:code', async (req, res) => {
  try {
    const country = await storage.getCountry(req.params.code);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch country' });
  }
});

app.get('/api/countries/:code/instruments', async (req, res) => {
  try {
    const instruments = await storage.getFinancialInstruments(req.params.code);
    res.json(instruments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch financial instruments' });
  }
});

app.get('/api/countries/:code/schemes', async (req, res) => {
  try {
    const schemes = await storage.getSavingsSchemes(req.params.code);
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch savings schemes' });
  }
});

app.get('/api/countries/:code/tax', async (req, res) => {
  try {
    const regulations = await storage.getTaxRegulations(req.params.code);
    res.json(regulations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tax regulations' });
  }
});

app.get('/api/countries/:code/recommendations', async (req, res) => {
  try {
    const recommendations = await storage.getRecommendations(req.params.code);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recommendations' });
  }
});

app.get('/api/countries/:code/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const results = await storage.searchContent(req.params.code, query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search content' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Financial Education Platform running on port ${PORT}`);
});