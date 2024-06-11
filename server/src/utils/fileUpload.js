import { ClientError } from '../middleware/error.js';
import fs from "fs";

const saveFile = async(filePath, file) => {
	const fileExtension = file.photo.name.split('.').pop();

	// if(fileExtension !== "png" && fileExtension !== "jpg")
	// 	throw new ClientError('Please provide a valid file', 400);

	await file.photo.mv(filePath);
}

async function deleteFile(filePath) {
	await fs.unlink(filePath, () =>{});
}

export { saveFile, deleteFile };