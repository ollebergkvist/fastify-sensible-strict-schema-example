import Fastify from "fastify";
import sensible from "@fastify/sensible";

import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import testRoute from "./routes/route";

export default function createFastifyInstance() {
  const fastify = Fastify({
    logger: true,
  });

  return fastify;
}

const app = createFastifyInstance();
app.register(sensible);
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(testRoute);

const start = async () => {
  try {
    await app.listen({ port: 3000, host: "127.0.0.1" });
  } catch (error) {
    app.log.error(error);
    // @ts-ignore
    process.exit(1);
  }
};

start();
