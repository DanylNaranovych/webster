export const EMAIL_TEMPLATES = {
	USER_SIGNUP: {
		subject: "Registration on forum",
		html: (token) =>{ return `
Please click this email to confirm your email: <a href="${process.env.CLIENT_URL}/confirm-email/${token}">Click here</a>`;
			},
	},
	USER_PASSWORD_RESET: {
		subject: "Confirm Password Reset",
		html:  (token) => { return`
<a href="${process.env.CLIENT_URL}${token}">Please click on this text to confirm your password reset.</a>`;
			},
	},
};