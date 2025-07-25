import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure EJS template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Serve static files from public directory  
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);
  
  // Add main EJS route
  app.get('/', async (req: Request, res: Response) => {
    try {
      const { storage } = await import('./storage.js');
      const countryCode = (req.query.country as string) || 'IN';
      const section = (req.query.section as string) || 'instruments';
      const searchQuery = req.query.search as string;
      
      // Get country information
      const countries = await storage.getCountries();
      const country = countries.find(c => c.code === countryCode) || countries[0];
      
      // Get data based on section
      let data: any = {};
      switch (section) {
        case 'instruments':
          data.instruments = await storage.getFinancialInstruments(countryCode);
          break;
        case 'savings':
          data.schemes = await storage.getSavingsSchemes(countryCode);
          break;
        case 'tax':
          data.regulations = await storage.getTaxRegulations(countryCode);
          break;
        default:
          data.instruments = await storage.getFinancialInstruments(countryCode);
          break;
      }
      
      // Get recommendations
      data.recommendations = await storage.getRecommendations(countryCode);
      
      res.render('index', {
        countries,
        country,
        section,
        searchQuery: searchQuery || '',
        ...data
      });
    } catch (error) {
      console.error('Error rendering page:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
