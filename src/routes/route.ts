import { type FastifyInstance } from "fastify";
import {
  type FastifyPluginAsyncZod,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";

/* {
	"statusCode": 400,
	"error": "Bad Request",
	"message": "Bad Request"
} */

/* 
.strict() mode generates:
{
	"statusCode": 500,
	"code": "FST_ERR_FAILED_ERROR_SERIALIZATION",
	"message": "Failed to serialize an error. Error: Response doesn't match the schema. Original error: Bad Request"
} 
*/

const testRoute: FastifyPluginAsyncZod = async function (
  fastify: FastifyInstance
) {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/test",
    schema: {
      response: {
        400: z
          .object({
            statusCode: z.literal(400),
            error: z.literal("Bad Request"),
            message: z.string(),
          })
          .strict(),
      },
    },
    async handler(request, reply) {
      return reply.badRequest();
    },
  });
};

export default testRoute;
