// https://linu.us/live-chat-with-sveltekit-and-socketio

import http from 'http';
import express from 'express';
import { injectSocketIO } from './socketIoHandler';
import { handler } from '../../../build/handler';

const app = express();
const server = http.createServer(app);

// Inject SocketIO
injectSocketIO(server);

// SvelteKit handlers
app.use(handler);

server.listen(3000, () => {
	console.info('Running on http://localhost:3000');
});
