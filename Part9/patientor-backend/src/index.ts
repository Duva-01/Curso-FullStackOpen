import express from 'express';
import diagnoseRouter from './routes/diagnoseRoutes';
import cors from 'cors'; 
import patientRouter from './routes/patientRoutes';

const app = express();
const PORT = 3003;

app.use(cors());  

app.use(express.json());

app.use('/', diagnoseRouter);
app.use('/', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
