import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import Logo from './Logo';

const Header = ({ timeout, onOpenArticle }) => (
	<header id="header" style={timeout ? { display: 'none' } : {}}>
		<div
			css={css`
				width: 5.5rem;
				height: 5.5rem;
				line-height: 5.5rem;
				border: solid 1px white;
				border-radius: 100%;
			`}>
			<Logo
				color="white"
				css={css`
					margin: 0.75rem;
				`}
			/>
		</div>

		<div className="content">
			<div className="inner">
				<h1>Brunner</h1>
				<h2>Technical Services LLC</h2>
				<p>
					Expert software design for your infrastructure,
					automation and analytics.
				</p>
			</div>
		</div>

		<nav>
			<ul>
				<li>
					<button
						onClick={() => {
							onOpenArticle('intro');
						}}>
						Intro
					</button>
				</li>
				<li>
					<button
						onClick={() => {
							onOpenArticle('work');
						}}>
						Work
					</button>
				</li>
				<li>
					<button
						onClick={() => {
							onOpenArticle('about');
						}}>
						About
					</button>
				</li>
				<li>
					<button
						onClick={() => {
							onOpenArticle('contact');
						}}>
						Contact
					</button>
				</li>
			</ul>
		</nav>
	</header>
);

Header.propTypes = {
	onOpenArticle: PropTypes.func,
	timeout: PropTypes.bool,
};

export default Header;
