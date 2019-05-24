'use strict';
const AWS = require('aws-sdk');
const ses = new AWS.SES();

const COMPANY_ADDRESS = 'info@brunnertechnicalservices.com';
const SENDER_ADDRESS = 'noreply@brunnertechnicalservices.com';

exports.handler = (event, context) => {
	console.log('Received event: ', event);

	ses.sendEmail(
		{
			Destination: {
				ToAddresses: [COMPANY_ADDRESS],
			},
			ReplyToAddresses: [event.email],
			Message: {
				Body: {
					Text: {
						Data:
							'name: ' +
							event.name +
							'\nemail: ' +
							event.email +
							'\nmessage: ' +
							event.message,
						Charset: 'UTF-8',
					},
				},
				Subject: {
					Data: 'Website Referral from: ' + event.name,
					Charset: 'UTF-8',
				},
			},
			Source: SENDER_ADDRESS,
		},
		err => {
			context.done(err, null);
		}
	);
};
