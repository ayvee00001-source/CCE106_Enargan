require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is missing from .env');
}

app.use(cors());
app.use(express.json());

const usersPath = path.join(__dirname, 'data', 'users.json');
const studentsPath = path.join(__dirname, 'data', 'students.json');

const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
const students = JSON.parse(fs.readFileSync(studentsPath, 'utf8'));

let hashedUsers = [];

async function prepareUsers() {
  hashedUsers = await Promise.all(
    users.map(async (user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      passwordHash: await bcrypt.hash(user.password, 10),
    }))
  );
}

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: '2h',
    }
  );
}

function authenticateToken(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Authentication token is required.',
    });
  }

  const token = authorization.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.auth = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: 'Invalid or expired authentication token.',
    });
  }
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

/*
|--------------------------------------------------------------------------
| GET /
|--------------------------------------------------------------------------
*/

app.get('/', (req, res) => {
  res.json({
    message: 'CCE106 Student Service API',
    status: 'running',
    endpoints: [
      'POST /login',
      'GET /students',
      'GET /students/:id',
      'GET /profile',
    ],
  });
});

/*
|--------------------------------------------------------------------------
| POST /login
|--------------------------------------------------------------------------
*/

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required.',
      });
    }

    const user = hashedUsers.find(
      (item) => item.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    const passwordValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordValid) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    const accessToken = createToken(user);

    return res.json({
      accessToken,
      user: publicUser(user),
    });
  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      message: 'Unable to process login.',
    });
  }
});

/*
|--------------------------------------------------------------------------
| GET /students
|--------------------------------------------------------------------------
*/

app.get('/students', authenticateToken, (req, res) => {
  res.json({
    students,
  });
});

/*
|--------------------------------------------------------------------------
| GET /students/:id
|--------------------------------------------------------------------------
*/

app.get('/students/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((item) => item.id === id);

  if (!student) {
    return res.status(404).json({
      message: 'Student not found.',
    });
  }

  return res.json({
    student,
  });
});

/*
|--------------------------------------------------------------------------
| GET /profile
|--------------------------------------------------------------------------
*/

app.get('/profile', authenticateToken, (req, res) => {
  const user = hashedUsers.find(
    (item) => item.id === req.auth.id
  );

  if (!user) {
    return res.status(404).json({
      message: 'Profile not found.',
    });
  }

  return res.json({
    user: publicUser(user),
  });
});

/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found.',
  });
});

/*
|--------------------------------------------------------------------------
| Start server
|--------------------------------------------------------------------------
*/

prepareUsers()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log('');
      console.log('==========================================');
      console.log(' CCE106 Student Service API');
      console.log('==========================================');
      console.log(`API running on port ${PORT}`);
      console.log('');
      console.log('Endpoints:');
      console.log(`POST http://localhost:${PORT}/login`);
      console.log(`GET  http://localhost:${PORT}/students`);
      console.log(`GET  http://localhost:${PORT}/students/:id`);
      console.log(`GET  http://localhost:${PORT}/profile`);
      console.log('');
    });
  })
  .catch((error) => {
    console.error('Failed to prepare users:', error);
    process.exit(1);
  });
