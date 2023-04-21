import type http from 'http';
import type { Message } from 'postcss';
import { Server } from 'socket.io';
import { addMessage, getMessageChangefeed } from './database.server';

// https://linu.us/live-chat-with-sveltekit-and-socketio

export async function injectSocketIO(
	server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) {
	const io = new Server(server);

	io.on('connection', (socket) => {
		socket.on('message', async (msg) => {
			const { username, roomId, message } = JSON.parse(msg);

			const newMessage = {
				roomId,
				senderName: username,
				message,
				timestamp: Date.now()
			};

			await addMessage(newMessage);
		});
	});

	const feed = await getMessageChangefeed();
	feed.each((err: any, message: any) => {
		io.emit('message', message.new_val as Message);
	});

	console.log('changefeeds configured');

	console.log('SocketIO injected');
}
