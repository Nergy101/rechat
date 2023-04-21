import { addMessage, getMessages, getRoomById } from '$lib/server/database.server';
import { fail } from '@sveltejs/kit';
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const room = await getRoomById(params.slug);
    return {
        roomName: room.name,
        roomId: room.id,
        messages: await getMessages(params.slug)
    };
}
/** @type {import('./$types').Actions} */
export const actions = {
    // addMessage: async ({ params, request }: any) => {
    // 	const data = await request.formData();
    // 	const message = data.get('message');
    // 	const senderName = data.get('senderName');
    // 	const timestamp = Date.now();
    // 	if (!message) {
    // 		return fail(400, { message, missing: true });
    // 	}
    // 	await addMessage({ message, senderName, roomId: params.slug, timestamp });
    // 	return { success: true };
    // },
    getMessages: async ({ params }) => {
        return { success: true, messages: await getMessages(params.slug) };
    }
};
//# sourceMappingURL=+page.server.js.map