import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const systems = await prisma.starSystem.findMany({
      include: { planets: true }
    });
    res.json(systems);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar sistemas estelares' });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const system = await prisma.starSystem.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { planets: true }
    });

    if (!system) {
      res.status(404).json({ error: 'Sistema estelar não encontrado' });
      return;
    }

    res.json(system);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar sistema estelar' });
  }
});

router.post(
  '/',
  authenticate,
  authorize(['Jedi', 'Admin']),
  async (req: Request, res: Response): Promise<void> => {
    const { name, description } = req.body;

    try {
      const system = await prisma.starSystem.create({
        data: { name, description }
      });

      res.status(201).json(system);
    } catch {
      res.status(500).json({ error: 'Erro ao criar sistema estelar' });
    }
  }
);

router.put(
  '/:id',
  authenticate,
  authorize(['Jedi', 'Admin']),
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;

    try {
      const updated = await prisma.starSystem.update({
        where: { id },
        data: { name, description }
      });

      res.json(updated);
    } catch {
      res.status(500).json({ error: 'Erro ao atualizar sistema estelar' });
    }
  }
);

router.delete(
  '/:id',
  authenticate,
  authorize(['Jedi', 'Admin']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      await prisma.starSystem.delete({ where: { id: parseInt(req.params.id) } });
      res.sendStatus(204);
    } catch {
      res.status(500).json({ error: 'Erro ao deletar sistema estelar' });
    }
  }
);

export default router;