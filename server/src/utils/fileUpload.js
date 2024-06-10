import { ClientError } from '../middleware/error.js';

const saveFile = async(file) => {
	const fileExtension = file.photo.name.split('.').pop();

	if(fileExtension !== "png" && fileExtension !== "jpg")
		throw new ClientError('Please provide a valid file', 400);

	const fileName = 'IMG_' + Date.now() + '.' + fileExtension;
	await file.photo.mv(process.env.FILES_DIR + fileName);

	return fileName;
}

export { saveFile };