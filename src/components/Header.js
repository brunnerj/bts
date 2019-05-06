import React from 'react'
import PropTypes from 'prop-types'

const Header = (props) => (
	<header id="header" style={props.timeout ? {display: 'none'} : {}}>
		<div className="logo"></div>
		<div className="content">
			<div className="inner">
				<h1>Brunner</h1>
				<h2>Technical Services LLC</h2>
				<p>Building modern, web-enabled interfaces for all your tools and infrastructure.</p>
			</div>
		</div>
		<nav>
			<ul>
				<li><a href="javascript:;" onClick={() => {props.onOpenArticle('intro')}}>Intro</a></li>
				<li><a href="javascript:;" onClick={() => {props.onOpenArticle('work')}}>Work</a></li>
				<li><a href="javascript:;" onClick={() => {props.onOpenArticle('about')}}>About</a></li>
				<li><a href="javascript:;" onClick={() => {props.onOpenArticle('contact')}}>Contact</a></li>
			</ul>
		</nav>
	</header>
)

Header.propTypes = {
	onOpenArticle: PropTypes.func,
	timeout: PropTypes.bool
}

export default Header
