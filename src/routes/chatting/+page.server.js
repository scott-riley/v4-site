import { RESEND_API_KEY } from '$env/static/private';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const subject = data.get('subject');
		const message = data.get('message');

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${RESEND_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: 'onboarding@resend.dev', // swap to your verified domain once ready
				to: 'hugs@scott.is',
				subject: `Message from ${email}: ${subject}`,
				html: `
				  <p><strong>From:</strong> ${email}</p>
					<p><strong>${subject}</strong></p>
					<p>${message}</p>`
			})
		});

		if (!res.ok) {
			return { success: false };
		}

		return { success: true };
	}
};
