import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './database';
import contactRouter from './routes/contact';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/identify', contactRouter);

// Start server after DB sync
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(` Server started on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error(' Failed to connect to database:', err);
});
