const fs = require('node:fs');
const path = require('node:path');
const filePath = path.join(__dirname,'..','data','tasks.json');//note:lokasi direktory

async function readTasks() {
	try {
		const data = await fs.promises.readFile(filePath,{encoding:'utf8'}); //note: Tunggu sampai selesai — minta Node.js bacakan file di lokasi ini, menggunakan bahasa utf8
		return JSON.parse(data);//note:"Ubah teks mentah (data) menjadi object JavaScript lalu kembalikan hasilnya ke yang memanggil function ini"
	} catch {
		return [];
	}
}

async function writeTasks(tasks) {
	const data = JSON.stringify(tasks,null,2);
	await fs.promises.writeFile(filePath,tasks,{encoding:'utf8'});
}

module.exports = {readTasks,writeTasks}