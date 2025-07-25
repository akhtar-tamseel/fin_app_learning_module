# Financial Education Platform

## Overview

This is a Node.js web application designed to provide financial education and information about various countries' financial systems. The application offers comprehensive data on financial instruments, savings schemes, and tax regulations for India, Spain, Germany, Mexico, and the US, making it a valuable resource for financial literacy and planning.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

This project has been successfully converted to a traditional server-side rendered Node.js application:

### Application Architecture
- **Framework**: Node.js with Express.js framework using ES modules
- **Template Engine**: EJS for server-side rendering
- **Styling**: Custom CSS with responsive design
- **Language**: JavaScript ES modules (converted from TypeScript)
- **Data Layer**: In-memory storage with comprehensive financial data

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: JavaScript with ES modules
- **API Design**: RESTful API structure with EJS template serving
- **Data Layer**: In-memory storage with detailed financial information for all countries

## Key Components

### Data Storage
The application uses an in-memory storage system with comprehensive financial data:
- **Countries**: Basic country information with currency details for India, Spain, Germany, Mexico, and the US
- **Financial Instruments**: Investment products categorized by type and risk level with detailed descriptions
- **Savings Schemes**: Government and institutional savings programs with specific terms
- **Tax Regulations**: Complete tax slabs, deductions, and regime information
- **Search Functionality**: Content search across all financial data

### Node.js Application Structure
- **EJS Templates**: Server-side rendered views with modular partials
- **Static Assets**: CSS and JavaScript files served from public directory
- **Interactive Features**: Dynamic content loading and country-specific data display
- **Responsive Design**: Mobile-friendly interface with custom styling

### API Endpoints & Routes
The Express server provides both web pages and API endpoints:
- `/` - Main application page with country selector and tabs
- `/api/countries` - Country listing and details
- `/api/countries/:code/instruments` - Financial instruments by country
- `/api/countries/:code/schemes` - Savings schemes by country
- `/api/countries/:code/tax` - Tax regulations by country
- `/api/countries/:code/search` - Search functionality for financial content

## Data Flow

1. **Client Request**: Browser requests pages or makes AJAX calls to API endpoints
2. **Express Routing**: Server routes requests to appropriate handlers
3. **Storage Layer**: In-memory storage provides financial data for all countries
4. **Template Rendering**: EJS templates render server-side HTML with dynamic data
5. **Client Interaction**: JavaScript enhances the interface with dynamic content loading

## Application Files

### Core Application Files
- **app.js**: Main Express server with ES module syntax
- **server/storage.js**: In-memory data storage with comprehensive financial information
- **views/index.ejs**: Main application template with country selector and tabs
- **views/partials/**: Modular templates for financial instruments, savings schemes, and tax regulations
- **public/**: Static assets including CSS and client-side JavaScript

### Key Features
- **Complete Financial Data**: Detailed information for India, Spain, Germany, Mexico, and the US
- **Server-Side Rendering**: Fast page loads with EJS templates
- **Interactive Interface**: Dynamic content loading and search functionality
- **Responsive Design**: Mobile-friendly layout with custom CSS
- **RESTful APIs**: JSON endpoints for data access

## Deployment Strategy

### Current Configuration
- **Development**: Node.js Express server on port 3001 (or configurable via PORT env variable)
- **Static Assets**: CSS and JavaScript served from public directory
- **Template Engine**: EJS for server-side rendering
- **Module System**: ES modules with proper import/export syntax

### Architecture Benefits
- **Simple Deployment**: Single Node.js application with no build step required
- **Fast Performance**: Server-side rendering provides quick page loads
- **SEO Friendly**: Complete HTML rendered on server
- **Scalability**: Clean separation between data layer and presentation
- **Maintainability**: Modular EJS templates and organized file structure

The application successfully demonstrates a complete conversion from React to Node.js, maintaining all functionality while providing the benefits of server-side rendering and simplified deployment.