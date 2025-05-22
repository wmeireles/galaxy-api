import { Router, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import prisma from '../prisma';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'segredo123'; // use do .env

// POST /auth/register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const { username, password, affiliation } = req.body;
  
    const hashed = await bcrypt.hash(password, 10);
  
    try {
      const user = await prisma.user.create({
        data: { username, password: hashed, affiliation }
      });
      res.status(201).json({ id: user.id, username: user.username });
    } catch (err) {
      res.status(400).json({ error: 'Usuário já existe' });
    }
  });

// POST /auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
  
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(401).json({ error: 'Usuário não encontrado' });
      return;
    }
  
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ error: 'Senha incorreta' });
      return;
    }
  
    const token = jwt.sign(
      { userId: user.id, affiliation: user.affiliation },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
  
    res.json({ token });
  });

export default router;
