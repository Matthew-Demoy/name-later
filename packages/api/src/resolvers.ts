import { User, JwtPayload } from './types';
import { generateJwt, parseJwt } from './jwt'; // Ensure these functions are also converted to TypeScript.

interface ResolverContext {
  users: Record<string, string>;
}

const resolvers: any = {
  Query: {
    welcomeMessage: (): string => 'Welcome to the Express API with Swagger',
    checkAuth: (_: any, { token }: { token: string }): string => {
      try {
        const decoded: any = parseJwt(token); // Make sure parseJwt returns a type-safe result.
        if (!decoded) {
          throw new Error('Invalid token');
        }
        return `User: ${decoded.data.username} Authenticated`;
      } catch (error) {
        throw new Error('Invalid token');
      }
    },
  },
  Mutation: {
    createUser: (_: any, { username, password }: User, context: ResolverContext): string => {
      if (context.users[username]) {
        throw new Error('User already exists');
      }
      if(!password){
        throw new Error('Password is required');
      }
      context.users[username] = password;
      return 'User created successfully';
    },
    login: (_: any, { username, password }: User, context: ResolverContext): User => {
      if (!username || !password || context.users[username] !== password) {
        throw new Error('Unauthorized');
      }
      const payload: JwtPayload = {
        data: { username },
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour
      };
      const token = generateJwt(payload);
      return { username, token };
    },
    logout: (): string => 'Logout successful',
  },
};

export default resolvers;
