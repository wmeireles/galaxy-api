import { Request, Response, NextFunction } from 'express';

export function authorize(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!user || !allowedRoles.includes(user.affiliation)) {
      res.status(403).json({ error: 'Acesso negado' });
      return;
    }

    next();
  };
}
