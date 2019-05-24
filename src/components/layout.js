import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import '../assets/scss/main.scss';

const Layout = ({ children, location }) => {
	let content;

	if (location && location.pathname === '/') {
		content = <div>{children}</div>;
	} else {
		content = (
			<div id="wrapper" className="page">
				<div>{children}</div>
			</div>
		);
	}

	const data = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
					}
				}
			}
		`
	);

	return (
		<>
			<Helmet
				title={data.site.siteMetadata.title}
				meta={[
					{
						name: 'description',
						content:
							'Brunner Technical Services capabilities portfolio.',
					},
					{
						name: 'keywords',
						content:
							'software, consulting, technical, design, instrumentation, iot, iiot',
					},
				]}>
				<html lang="en" />
			</Helmet>

			{content}
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
