export default async (req, res, next) => {
  const authheader = req.headers.authorization;

  if (!authheader) return res.status(401).json({ error: 'token not provided' });

  req.ongId = authheader;

  return next();
};
