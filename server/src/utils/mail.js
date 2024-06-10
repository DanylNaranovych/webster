import nodemailer from 'nodemailer';
import { NODEMAILER_TRANSPORTER } from '../consts/nodemailer.js';

const sendMail = async(email, subject, html) => {
	const transporter = nodemailer.createTransport(NODEMAILER_TRANSPORTER);
	await transporter.sendMail({
		from: 'Uevent Team',
		to: email,
		subject: subject,
		html: html,
	});
}

export { sendMail };