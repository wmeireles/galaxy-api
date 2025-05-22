import * as express from 'express';
import planets from './routes/planets';
import characters from './routes/characters';
import spaceships from './routes/spaceships';
import starSystems from './routes/starSystems';
import authRoutes from './routes/auth';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/planets', planets);
app.use('/characters', characters);
app.use('/spaceships', spaceships);
app.use('/star-systems', starSystems);

app.listen(3000, () => {
  console.log('🌌 API Galaxy rodando em http://localhost:3000');
});
