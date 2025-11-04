const fs = require('fs').promises;
const path = require('path');

async function logger(req, res, next) {
  const dir = path.join(__dirname, '..', 'logs');
  const file = path.join(dir, `${new Date().toISOString().slice(0,10)}.log`);
  await fs.mkdir(dir, { recursive: true });
  res.on('finish', async () => 
  {
    const line = `${req.ip} ${req.method} ${req.originalUrl} ${res.statusCode}\n`;
    await fs.appendFile(file, line);
  }
  );
  next();
}

module.exports = logger;