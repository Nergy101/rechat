import type { Message } from '$lib/shared/models/message.model';
import pkg, { type Connection, type Cursor, type Table } from 'rethinkdb';
import type { Room } from '../shared/models/room.model';

const { connect, db, row, asc } = pkg;

const _db = db('dev'); //! use env.environment "dev" "prd"

EnsureDatabaseExists();

export async function getTable(table: string): Promise<Table> {
	return _db.table(table);
}

export async function getConnection(): Promise<Connection> {
	return await connect({ host: 'localhost', port: 28015 });
}

export async function EnsureDatabaseExists(): Promise<void> {
	const connection = await getConnection();
	try {
		await _db.tableCreate('rooms').run(connection);
	} catch (e) {}
	try {
		await _db.tableCreate('messages').run(connection);
	} catch (e) {}

	console.info('Ensured DB and tables exist');
	await connection.close();
}

export async function getRooms(): Promise<Room[]> {
	const connection = await getConnection();
	const cursor = await _db.table('rooms').orderBy(asc('timestamp')).run(connection);
	const result = await cursor.toArray();
	return result as Room[];
}

export async function getRoomById(id: string): Promise<Room> {
	const connection = await getConnection();
	return (await _db.table('rooms').get(id).run(connection)) as Room;
}

export async function addRoom(room: Room) {
	const connection = await getConnection();
	const { name, timestamp } = room;
	await _db
		.table('rooms')
		.insert([
			{
				name,
				timestamp
			}
		] as Room[])
		.run(connection);
}

export async function addMessage(messageModel: Message): Promise<void> {
	const connection = await getConnection();
	await _db
		.table('messages')
		.insert([
			{
				...messageModel
			}
		])
		.run(connection);
}

export async function getMessages(roomId: string): Promise<Message[]> {
	const connection = await getConnection();
	const result = (await (
		await _db
			.table('messages')
			.filter(row('roomId').eq(roomId))
			.orderBy(asc('timestamp'))
			.run(connection)
	).toArray()) as Message[];
	return result;
}

export async function getMessageChangefeed(): Promise<Cursor> {
	const connection = await getConnection();
	return await _db.table('messages').changes().run(connection);
}
