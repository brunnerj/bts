import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core';

import ContactForm from './ContactForm';

import pic01 from '../images/pic01.jpg'
import pic02 from '../images/pic02.jpg'
import pic03 from '../images/pic03.png'

const highlightStyle = css`
	color: #28ac70;
	font-size: 110%;
`;

class Main extends React.Component {

	constructor(props) {
		super(props);

		this.handleSwitchArticle = this.handleSwitchArticle.bind(this);
	}

	handleSwitchArticle(article, e) {

		e.preventDefault();

		this.props.onCloseArticle();
		
		setTimeout(() => {
			this.props.onOpenArticle(article);
		}, 150);
	}

	render() {

		let close = <div className='close' onClick={() => {this.props.onCloseArticle()}}></div>

		return (
			<div id='main' ref={this.props.setWrapperRef} 
				style={this.props.timeout ? {display: 'flex'} : {display: 'none'}}>

				<article id='intro' className={`${this.props.article === 'intro' ? 'active' : ''} 
						${this.props.articleTimeout ? 'timeout' : ''}`} 
						style={{display:'none'}}>

					<h2 className='major'>Intro</h2>
					<span className='image main'><img src={pic01} alt='' /></span>

					<p>Hello, I'm <span css={highlightStyle}>James Brunner</span>,
					the founding member and principal engineer at <span css={highlightStyle}>Brunner
					Technical Services LLC</span>.  I specialize in full-stack software development
					for IIoT, equipment automation and system analytics. I have the skills and
					experience to create modern and intuitive web-based, mobile native and enterprise
					software applications and interfaces for a variety of equipment and industrial
					infrastructure.</p>

					<p>With 23+ years of software development experience, I have delivered quality software
					and participated in or lead projects ranging
					from <span css={highlightStyle}>enterprise application</span> designs
					to <span css={highlightStyle}>mobile test equipment</span> interfaces, and
					from <span css={highlightStyle}>web applications and portal</span> development
					to <span css={highlightStyle}>IIoT and embedded hardware</span> solutions.</p>

					<p>I can integrate with your existing team or lead your project from
					inception through release, and you'll always get a solid, well-documented
					and easily maintained product. <a href='#contact' onClick={(e) => {this.handleSwitchArticle('contact', e)}} >Contact me now</a> to
					discuss the details of your project!</p>

					{close}
				</article>

				<article id='work' className={`${this.props.article === 'work' ? 'active' : ''}
					${this.props.articleTimeout ? 'timeout' : ''}`}
					style={{display:'none'}}>

					<h2 className='major'>Work</h2>
					<span className='image main'><img src={pic02} alt='' /></span>
					
					<p>Adipiscing magna sed dolor elit. Praesent eleifend dignissim arcu, at eleifend sapien imperdiet ac. Aliquam erat volutpat. Praesent urna nisi, fringila lorem et vehicula lacinia quam. Integer sollicitudin mauris nec lorem luctus ultrices.</p>
					<p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus pharetra. Pellentesque condimentum sem. In efficitur ligula tate urna. Maecenas laoreet massa vel lacinia pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis libero. Mauris aliquet magna magna sed nunc rhoncus amet feugiat tempus.</p>
					{close}
				</article>

				<article id='about' className={`${this.props.article === 'about' ? 'active' : ''}
					${this.props.articleTimeout ? 'timeout' : ''}`}
					style={{display:'none'}}>
					
					<h2 className='major'>About</h2>
					<span className='image main'><img src={pic03} title='people walking on pedestrian lane during day time' alt='by Chris Barbalis on Unsplash' /></span>
					
					<p>Lorem ipsum dolor sit amet, consectetur et adipiscing elit. Praesent eleifend dignissim arcu, at eleifend sapien imperdiet ac. Aliquam erat volutpat. Praesent urna nisi, fringila lorem et vehicula lacinia quam. Integer sollicitudin mauris nec lorem luctus ultrices. Aliquam libero et malesuada fames ac ante ipsum primis in faucibus. Cras viverra ligula sit amet ex mollis mattis lorem ipsum dolor sit amet.</p>
					
					{close}
				</article>

				<article id='contact' className={`${this.props.article === 'contact' ? 'active' : ''}
					${this.props.articleTimeout ? 'timeout' : ''}`}
					style={{display:'none'}}>
					
					<h2 className='major'>Contact</h2>
					
					<ContactForm done={this.props.onCloseArticle} />

					{close}
				</article>

			</div>
		)
	}
}

Main.propTypes = {
	route: PropTypes.object,
	article: PropTypes.string,
	articleTimeout: PropTypes.bool,
	onCloseArticle: PropTypes.func,
	timeout: PropTypes.bool,
	setWrapperRef: PropTypes.func.isRequired
}

export default Main