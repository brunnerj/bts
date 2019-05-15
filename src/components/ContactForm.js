import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const API_CONTACT_URL = 'https://97ty7szc7i.execute-api.us-east-1.amazonaws.com/bts/contact-us';

const validatedFormStyle = css`
	input:invalid {
		border-color: red;
	}
`;

class ContactForm extends React.Component {

	constructor() {
		super();

		this.state = { displayErrors: false };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		if (!e.target.checkValidity()) {
			this.setState( { displayErrors: true });
			return;
		}

		this.setState({ displayErrors: false }); 

		const data = new FormData(e.target);

		// spam check - contact gets checked by bots
		if (!!data.get('contact')) return true;

		let logData = {};
		for (let pair of data.entries()){
			logData[pair[0]] = pair[1];
		}
		console.log('Submitting data: ', logData);

		// submit to AWS API Gateway
		fetch(API_CONTACT_URL, {
			method: 'POST',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(logData)
		})
		.then(() => {
			alert('Message sent');
			this.props.done();
		});
	}

	handleReset(e) {
		this.setState({ displayErrors: false });
	}

	render() {

		const { displayErrors } = this.state;

		return (
			<form method='post' onSubmit={this.handleSubmit} noValidate 
				css={displayErrors ? validatedFormStyle : {}}>

				<div className='field half first'>
					<label htmlFor='name'>Name</label>
					<input type='text' name='name' id='name' required />
				</div>

				<div className='field half'>
					<label htmlFor='email'>Email</label>
					<input type='email' name='email' id='email' required />
				</div>

				{/* this input is used as a spambot honeypot */}
				<input type='checkbox' name='contact' value='1' tabIndex='-1' autoComplete='off' />
				
				<div className='field'>
					<label htmlFor='message'>Message</label>
					<textarea name='message' id='message' rows='4'></textarea>
				</div>

				<ul className='actions'>
					<li><input type='submit' value='Send Message' className='special' /></li>
					<li><input type='reset' value='Reset' onClick={this.handleReset}/></li>
				</ul>

				<ul className='icons'>
					<li><a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/james-brunner/' className='icon fa-linkedin'><span className='label'>LinkedIn</span></a></li>
					<li><a target='_blank' rel='noopener noreferrer' href='https://www.instagram.com/james.jack.brunner/' className='icon fa-instagram'><span className='label'>Instagram</span></a></li>
					<li><a target='_blank' rel='noopener noreferrer' href='https://github.com/brunnerj' className='icon fa-github'><span className='label'>GitHub</span></a></li>
				</ul>
			</form>
		);
	}
}

ContactForm.propTypes = {
	done: PropTypes.func.isRequired
}

export default ContactForm;