import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/sign-in', (req, res) => {
  res.sendFile(path.join(path.resolve(), './assets/auth.html'));
});

router.get('/sign-up', (req, res) => {
  res.sendFile(path.join(path.resolve(), './assets/register.html'));
});

export default router;
