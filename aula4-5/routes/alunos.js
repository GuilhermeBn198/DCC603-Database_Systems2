import express from 'express';
const router = express.Router();

const alunosDados = {
	1: { nome: 'João', idade: 20 },
	2: { nome: 'Maria', idade: 22 },
	3: { nome: 'Pedro', idade: 19 },
	4: { nome: 'Ana', idade: 21 }
  };

  router.use(express.json());
  
  router.get('/', (req, res) => {
	res.send('HELLO WORLD');
  });

  router.get('/alunos', (req, res) => {
	res.json(alunosDados);
  });

  router.post('/alunos', (req, res) => {
	console.log(req.body);
	res.send('Lista de alunos POST');
  });
  
  export default router;