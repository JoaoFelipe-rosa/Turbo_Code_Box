// apps/api/index.ts
import express from 'express';
import next from 'next';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const prisma = new PrismaClient();

async function main() {
  await nextApp.prepare();
  const app = express();
  const port = process.env.PORT || 8080;

  app.use(express.json());
  app.use(cors());


  // Rotas Express
  app.post('/exercise', async (req, res) => {
    await prisma.exercise.create({
      data: {
        exerciseName: req.body.exerciseName,
        repetition: req.body.repetition,
        repetitionAmount: req.body.repetitionAmount,
        sex: req.body.sex,
        type: req.body.type,
        img: req.body.img
      }
    });
    res.status(201).json({ "menssage": "Exercise registered successfully"});
  })
  
  app.get('/exercise', async (_req, res) => {
  
    const exercise = await prisma.exercise.findMany()
  
    res.status(201).json(exercise);
  });
  
  app.delete('/exercise/:id', async (req, res) => {
    await prisma.exercise.delete({
      where: {
        id: req.params.id
      }
    })
  
    res.status(204).json({"menssage": "ok"});
  });

  // Fallback para rotas do Next.js
  app.all('*', (req, res) => handle(req, res));

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

main().catch(console.error);
