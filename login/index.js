import { sign, verify } from 'jsonwebtoken';
import config from 'config';

const SECRET = config.get('JWT_SECRET');
const DATA = 'logged_in';

const createJWToken = (data) => {
  return sign(data, SECRET);
};

const verifyJWToken = (token) => {
  try {
    const decoded = verify(token, SECRET);
    return decoded === DATA;
  } catch (e) {
    return false;
  }
};

const login = (_req, res) => {
  return res.send(createJWToken(DATA));
};

const verifyAuth = (req, _res, next) => {
  const token = req.query.token;
  if (!verifyJWToken(token)) {
    next({
      status: 401,
      message: 'Unauthorized',
    });
  }

  next();
};

export { login, verifyAuth };
