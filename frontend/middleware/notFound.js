import path from 'path';

export default function (req, res, next) {
  res.status(404).sendFile(path.join(path.resolve(), './assets/404.html'));
}
