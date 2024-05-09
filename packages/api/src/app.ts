import express, { NextFunction, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger';
import { generateJwt, parseJwt, JwtPayload } from './jwt';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import resolvers from './resolvers';


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    users: {} as Record<string, string>,
  }),
});


// Create an Express application
const app = express();
const port = 3000;

var options = {
  explorer: false
};


const verifyToken = (req: Request, res: Response, next: NextFunction) => {  
  const token = req.headers.auth as string;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = parseJwt(token);
    if(decoded == null){
      throw("invalid token")
    }
    res.locals.data = decoded?.data;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'))
server.applyMiddleware({ app, path: '/graphql' });

app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerSpec, options));
// Middleware function to set cache-control headers
function setNoCache(req : Request, res : Response, next : NextFunction) {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Expires', '0');
  next(); // Call the next middleware function in the stack
}

// Apply the middleware to all routes
app.use(setNoCache);
// Mock database to store user information
const users: { [username: string]: string } = {
"string" : "string"
};


/**
 * @swagger
 * /:
 *  get:
 *   summary: Welcome message
 *  description: Welcome message for the Express API with Swagger
 */
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the Express API with Swagger' });
})

/**
 * @swagger
 * /create-user:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user with a username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Username and password are required, or user already exists
 */
app.post('/create-user', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  if (users[username]) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users[username] = password;
  return res.status(201).json({ message: 'User created successfully' });
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with username and password
 *     description: Endpoint to authenticate a user with a username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Unauthorized, invalid credentials
 */
app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  if (!username || !password || users[username] !== password) {
    return res.sendStatus(401);
  }

  const payload: JwtPayload = {
    data: {username },
    exp: Math.floor(Date.now() / 1000) + 3600, // Expiration time: current time + 1 hour
  };

  const token = generateJwt(payload)

  // You can use sessions or JWT tokens for authentication and authorization
  return res.status(200).json({ message: 'Login successful', token });
});

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout
 *     description: Endpoint to logout the current user.
 *     responses:
 *       '200':
 *         description: Logout successful
 */
app.post('/logout', (req: Request, res: Response) => {
  // Here you can invalidate the session or JWT token
  return res.status(200).json({ message: 'Logout successful' });
});

app.get('/download', (req : Request, res : Response) => {
  throw new Error('Download failed')
  return res.download('public/fire.mp3')
})

/**
 * @swagger
 * /checkAuth:
 *   get:
 *     summary: Check auth token
 *     parameters:
 *       - in: header
 *         name: auth
 *         schema:
 *           type: string
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoic3RyaW5nIn0sImV4cCI6MTcxNDQ5OTg5Nn0=.WD1cjAiR3G27xvlsMehy+XxiXf6qxWK03i+S7D2wPKM=
 *         required: true
 *         description: Auth token
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Invalid token
 */
app.get('/checkAuth', verifyToken, (req : Request, res : Response) => {
  const username = res.locals.data.username as JwtPayload
  return res.status(200).json({message : `User:${username} Authenticated`})
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
