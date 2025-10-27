import Fastify from 'fastify';
import payHandler from './lib/pay.js';
import webfingerHandler from './lib/webfinger.js';

const fastify = Fastify({
  logger: true,
});

fastify.get('/.well-known/pay', async (request, reply) => {
  return await payHandler(request, reply);
});

fastify.get('/.well-known/webfinger', async (request, reply) => {
  return await webfingerHandler(request, reply);
});

const start = async () => {
  try {
    await fastify.listen({ host: '0.0.0.0', port: 4000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
