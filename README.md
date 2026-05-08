# Work Experience API

Detta är en REST-baserad webbtjänst byggd med Node.js, Express, MongoDB och Mongoose.

API:et hanterar arbetserfarenheter och stödjer CRUD-operationer: Create, Read, Update och Delete.

## Tekniker

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv

## Databas

Databas: `lab3`  
Collection: `experiences`

Varje arbetserfarenhet innehåller följande fält:

- company
- role
- location
- startDate
- endDate
- description

## Installation

1. Klona repot

```bash
git clone https://github.com/Coco10023/lab3-backend.git
```

2. Installera dependencies:
npm install

3. Skapa en .env-fil:
PORT=3000
MONGO_URI= MIN_MONGODB_CONNECTION_STRING

4. Starta servern:
node server.js

Servern körs då på:
http://localhost:3000

## API Endpoints: 
Metod	Endpoint	Beskrivning
GET	/	Testar att API fungerar
GET	/api/experiences	Hämtar alla arbetserfarenheter
GET	/api/experiences/:id	Hämtar en specifik arbetserfarenhet
POST	/api/experiences	Skapar en ny arbetserfarenhet
PUT	/api/experiences/:id	Uppdaterar en arbetserfarenhet
DELETE	/api/experiences/:id	Raderar en arbetserfarenhet

## Exempel på JSON (POST/PUT)
{
  "company": "Test AB",
  "role": "Frontendutvecklare",
  "location": "Malmö",
  "startDate": "2022",
  "endDate": "2024",
  "description": "Jobbade med HTML, CSS och JavaScript"

## Validering

API:et kontrollerar att obligatoriska fält är ifyllda innan data sparas.

Obligatoriska fält:

company
role
location
startDate
description

Om något saknas returneras ett felmeddelande i JSON-format.

## CORS

CORS är aktiverat så att webbtjänsten kan användas från en separat frontend.

## Publicering

Bas-URL:
https://lab3-backend-k7rv.onrender.com/

Endpoint:
https://lab3-backend-k7rv.onrender.com/api/experiences
