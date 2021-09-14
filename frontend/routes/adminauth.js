import { Router } from 'express';
import path from 'path';

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), './assets/adminauth.html'));
});

export default router;
