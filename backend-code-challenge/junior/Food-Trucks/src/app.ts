import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';

dotenv.config();
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,"..", "Public")))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Public', 'index.html'));
});

app.get('/food-trucks', async (req, res) => {
  try {
      const { latitude, longitude } = req.query;

      if (!latitude || !longitude) {
          throw new Error('Latitude and longitude are required.');
      }

      const response = await axios.get(
          `https://data.sfgov.org/resource/rqzj-sfat.json?$where=within_circle(location, ${latitude}, ${longitude}, 1000)`
      );

      const foodTrucks = response.data.map((truck: any) => {
          return {
              name: truck.applicant,
              address: truck.locationdescription,
              foodItems: truck.fooditems
          };
      });

      res.json(foodTrucks);
  } catch (error) {
    
      res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

export default app;

