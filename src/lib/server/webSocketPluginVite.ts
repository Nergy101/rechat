import { injectSocketIO } from './socketIoHandler';
// https://linu.us/live-chat-with-sveltekit-and-socketio

export const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: any) {
		injectSocketIO(server.httpServer);
	}
};
