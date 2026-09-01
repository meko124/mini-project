const fs = require('node:fs');
const path = require('node:path');
const filePath = path.join(__dirname,'..','data','tasks.json');

async function readTasks() {
	try {
		const data = await fs.promises.readFile(filePath,'utf8');
		return JSON.parse(data);
	} catch {
		return [];
	}
}