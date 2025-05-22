import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const planets = await prisma.planet.findMany();
    res.json(planets);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar planetas' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const planet = await prisma.planet.findUnique({ where: { id } });

    if (!planet) {
      res.status(404).json({ error: 'Planeta não encontrado' });
      return;
    }

    res.json(planet);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar planeta' });
  }
});

router.post(
  '/',
  authenticate,
  authorize(['Jedi', 'Admin']),
  async (req, res) => {
    const { name, climate, terrain, population, starSystemId } = req.body;

    if (!name || !climate || !terrain || !population) {
      res.status(400).json({ error: 'Campos obrigatórios ausentes' });
      return;
    }

    try {
      const planet = await prisma.planet.create({
        data: { name, climate, terrain, population, starSystemId }
      });
      res.status(201).json(planet);
    } catch {
      res.status(500).json({ error: 'Erro ao criar planeta' });
    }
  }
);

router.put(
  '/:id',
  authenticate,
  authorize(['Jedi', 'Admin']),
  async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, climate, terrain, population, starSystemId } = req.body;

    try {
      const planet = await prisma.planet.update({
        where: { id },
        data: { name, climate, terrain, population, starSystemId }
      });
      res.json(planet);
    } catch {
      res.status(500).json({ error: 'Erro ao atualizar planeta' });
    }
  }
);

router.delete(
  '/:id',
  authenticate,
  authorize(['Jedi', 'Admin']),
  async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      await prisma.planet.delete({ where: { id } });
      res.sendStatus(204);
    } catch {
      res.status(500).json({ error: 'Erro ao deletar planeta' });
    }
  }
);

export default router;
