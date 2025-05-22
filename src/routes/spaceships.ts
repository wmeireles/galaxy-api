import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const ships = await prisma.spaceship.findMany();
    res.json(ships);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar naves' });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const ship = await prisma.spaceship.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!ship) {
      res.status(404).json({ error: 'Nave não encontrada' });
      return;
    }

    res.json(ship);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar nave' });
  }
});

router.post(
  '/',
  authenticate,
  authorize(['Admin', 'Jedi']),
  async (req: Request, res: Response): Promise<void> => {
    const { name, model, manufacturer, passengerCapacity } = req.body;

    if (!name || !model || !manufacturer || passengerCapacity === undefined) {
      res.status(400).json({ error: 'Campos obrigatórios ausentes' });
      return;
    }

    try {
      const ship = await prisma.spaceship.create({
        data: { name, model, manufacturer, passengerCapacity }
      });

      res.status(201).json(ship);
    } catch {
      res.status(500).json({ error: 'Erro ao criar nave' });
    }
  }
);

router.put(
  '/:id',
  authenticate,
  authorize(['Admin', 'Jedi']),
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { name, model, manufacturer, passengerCapacity } = req.body;

    try {
      const updated = await prisma.spaceship.update({
        where: { id },
        data: { name, model, manufacturer, passengerCapacity }
      });

      res.json(updated);
    } catch {
      res.status(500).json({ error: 'Erro ao atualizar nave' });
    }
  }
);

router.delete(
  '/:id',
  authenticate,
  authorize(['Admin']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      await prisma.spaceship.delete({ where: { id: parseInt(req.params.id) } });
      res.sendStatus(204);
    } catch {
      res.status(500).json({ error: 'Erro ao deletar nave' });
    }
  }
);

export default router;
