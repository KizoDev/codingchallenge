import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname,"..", "Public")))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Public', 'index.html'));
});

app.get('/filming-locations', async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;

        if (!searchTerm) {
            throw new Error('Search term is required.');
        }
   
        const response = await axios.get(`https://data.sfgov.org/resource/wwmu-gmzc.json?title=${searchTerm}`);

        const locations = response.data.map((location: any) => {
            return {
                title: location.title,
                locations: location.locations,
                director: location.director,
                release_year: location.release_year,
            };
        });

        res.json(locations);
    } catch (error) {
      res.status(500).json({ error: error.message });
            }
});



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
   
export default app