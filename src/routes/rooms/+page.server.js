import { getRooms, addRoom } from '$lib/server/database.server';
import { fail } from '@sveltejs/kit';
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return {
        rooms: await getRooms()
    };
}
/** @type {import('./$types').Actions} */
export const actions = {
    addRoom: async ({ cookies, request }) => {
        const data = await request.formData();
        const name = data.get('roomName');
        const timestamp = Date.now();
        if (!name) {
            return fail(400, { name, missing: true });
        }
        await addRoom({ name, timestamp });
        return { name };
    },
    getRooms: async (_) => {
        return { rooms: await getRooms() };
    }
};
//# sourceMappingURL=+page.server.js.map