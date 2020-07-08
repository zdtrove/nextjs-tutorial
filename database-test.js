const sqlite = require('sqlite')

async function setup() {
	const db = await sqlite.open('./mydb.sqlite')
	await db.migrate({ force: 'last' })

	const people = await db.all('SELECT * FROM person');
	console.log('all people', JSON.stringify(people, null, 2))

	const vehicles = await db.all('SELECT * FROM vehicle');
	console.log('all vehicles', JSON.stringify(vehicles, null, 2))
}

setup()