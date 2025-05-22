import { Router, Request, Response } from 'express';
import prisma from '../prisma';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/roles';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const characters = await prisma.character.findMany({
      include: { homeworld: true }
    });
    res.json(characters);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar personagens' });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const character = await prisma.character.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { homeworld: true }
    });

    if (!character) {
      res.status(404).json({ error: 'Personagem não encontrado' });
      return;
    }

    res.json(character);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar personagem' });
  }
});

router.post(
  '/',
  authenticate,
  authorize(['Rebelde', 'Jedi', 'Admin']),
  async (req: Request, res: Response): Promise<void> => {
    const { name, race, affiliation, homeworldId } = req.body;

    try {
      const character = await prisma.character.create({
        data: { name, race, affiliation, homeworldId }
      });
      res.status(201).json(character);
    } catch {
      res.status(500).json({ error: 'Erro ao criar personagem' });
    }
  }
);

router.put(
  '/:id',
  authenticate,
  authorize(['Rebelde', 'Jedi', 'Admin']),
  async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const { name, race, affiliation, homeworldId } = req.body;

    try {
      const updated = await prisma.character.update({
        where: { id },
        data: { name, race, affiliation, homeworldId }
      });
      res.json(updated);
    } catch {
      res.status(500).json({ error: 'Erro ao atualizar personagem' });
    }
  }
);

router.delete(
  '/:id',
  authenticate,
  authorize(['Admin']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      await prisma.character.delete({ where: { id: parseInt(req.params.id) } });
      res.sendStatus(204);
    } catch {
      res.status(500).json({ error: 'Erro ao deletar personagem' });
    }
  }
);

export default router;
