import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/sign_in', (req, res) => {
  res.sendFile(path.join(path.resolve(), './assets/auth.html'));
});

router.get('/sign_up', (req, res) => {
  res.sendFile(path.join(path.resolve(), './assets/register.html'));
});

export default router;
