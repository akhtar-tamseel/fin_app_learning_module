import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Countries
  app.get("/api/countries", async (req, res) => {
    try {
      const countries = await storage.getCountries();
      res.json(countries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch countries" });
    }
  });

  app.get("/api/countries/:code", async (req, res) => {
    try {
      const country = await storage.getCountry(req.params.code);
      if (!country) {
        return res.status(404).json({ message: "Country not found" });
      }
      res.json(country);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch country" });
    }
  });

  // Financial Instruments
  app.get("/api/countries/:code/instruments", async (req, res) => {
    try {
      const instruments = await storage.getFinancialInstruments(req.params.code);
      res.json(instruments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch financial instruments" });
    }
  });

  // Savings Schemes
  app.get("/api/countries/:code/schemes", async (req, res) => {
    try {
      const schemes = await storage.getSavingsSchemes(req.params.code);
      res.json(schemes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch savings schemes" });
    }
  });

  // Tax Regulations
  app.get("/api/countries/:code/tax", async (req, res) => {
    try {
      const regulations = await storage.getTaxRegulations(req.params.code);
      res.json(regulations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tax regulations" });
    }
  });

  // Recommendations
  app.get("/api/countries/:code/recommendations", async (req, res) => {
    try {
      const recommendations = await storage.getRecommendations(req.params.code);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recommendations" });
    }
  });

  // Search
  app.get("/api/countries/:code/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const results = await storage.searchContent(req.params.code, query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Failed to search content" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
