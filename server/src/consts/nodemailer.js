export const NODEMAILER_TRANSPORTER = {
	host: process.env.NODEMAILER_HOST,
	port: process.env.NODEMAILER_PORT,
	auth: {
		user: process.env.NODEMAILER_USER,
		pass: process.env.NODEMAILER_PASSWORD
	}
};

export const CRON_TIMEZONE = 'Europe/Kiev';