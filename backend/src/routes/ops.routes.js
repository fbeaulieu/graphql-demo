const opsRoutes = async (fastify, options, next) => {
	fastify.get("/version", async (request, reply) => {
		reply.status(200).send({ version: '1.0.0', timestamp: new Date() });
	});

	fastify.get("/healthcheck", async (request, reply) => {
		reply.status(200).send({ alive: true, timestamp: new Date() });
	});

	next();
}

export default opsRoutes;
