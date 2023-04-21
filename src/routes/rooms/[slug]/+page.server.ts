import { addMessage, getMessages, getRoomById } from '$lib/server/database.server';
import { fail, type ActionResult, type Actions } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }: any) {
	const room = await getRoomById(params.slug);
	return {
		roomName: room.name,
		roomId: room.id,
		messages: await getMessages(params.slug)
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	getMessages: async ({ params }: any) => {
		return { success: true, messages: await getMessages(params.slug) };
	}
};
