import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  PORT: port(),
  NODE_ENV: str(),
  AUTH_SECRET: str(),
  DATABASE_URL: str(),
  JWT_KEY: str(),
  REDIS_USERNAME: str(),
  REDIS_PASSWORD: str(),
  REDIS_HOST: str(),
  REDIS_PORT: port(),
});
