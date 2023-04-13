import express from 'express';
import alunosRouter from './routes/alunos.js';
import cursos from "./routes/cursos.js";

const app = express();

app.use('/alunos', alunosRouter);

app.use('/', alunosRouter);


app.listen(5000, () => {
  console.log('Servidor escutando na porta 5000');
});
