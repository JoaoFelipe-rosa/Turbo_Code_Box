import express from 'express';
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.listen(port)


// USER API
app.post('/user', async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age
    }
  });
  res.status(201).json({"menssage": "success"});
})

app.get('/user', async (_req, res) => {

  const users = await prisma.user.findMany()

  res.status(201).json(users);
});

app.delete('/user/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id 
    }
  })

  res.status(204).json({"menssage": "ok"});
});





// TRAIN API
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

