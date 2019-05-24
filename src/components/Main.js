import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import ContactForm from './ContactForm';

const highlightStyle = css`
	color: #28ac70;
	font-size: 110%;
`;

const projectListStyle = css`
	list-style-type: none;
	margin: 0;
	padding: 0;

	li {
		margin-bottom: 2.75rem;
		padding: 0;
		&:last-child {
			margin-bottom: 0;
		}
	}

	button {
		position: relative;
		width: 100%;
		text-align: left;
		line-height: 2.75rem;
		box-shadow: none;
		border-radius: 2.75rem 0 0 2.75rem;

		&::before {
			content: '';
			position: absolute;
			left: 0;
			width: 2.75rem;
			height: 2.75rem;
			z-index: -1;
			border-radius: 50%;
			background: #28ac70;
			opacity: 0.4;
			transition: opacity 0.2s ease-in-out;
		}

		&:hover::before {
			opacity: 0.8;
		}
	}

	p {
		margin-left: 2.75rem;
		font-style: italic;
	}
`;

export const fluidImage = graphql`
	fragment fluidImage on File {
		image: childImageSharp {
			fluid(maxWidth: 760) {
				...GatsbyImageSharpFluid
			}
		}
	}
`;

const Main = ({
	timeout,
	article,
	articleTimeout,
	onCloseArticle,
	setWrapperRef,
}) => {
	const close = (
		<div
			className="close"
			onClick={() => {
				onCloseArticle();
			}}
		/>
	);

	const handleSwitchArticle = (newArticle, e) => {
		e.preventDefault();

		onCloseArticle(newArticle);
	};

	const data = useStaticQuery(
		graphql`
			query {
				intro: file(relativePath: { eq: "pic-intro.png" }) {
					...fluidImage
				}
				work: file(relativePath: { eq: "pic-work.png" }) {
					...fluidImage
				}
				about: file(relativePath: { eq: "pic-about.png" }) {
					...fluidImage
				}
				projects: allMarkdownRemark(
					sort: { fields: [frontmatter___date], order: DESC }
				) {
					totalCount
					edges {
						node {
							id
							frontmatter {
								title
								date
								featureImage {
									...fluidImage
								}
							}
							excerpt(pruneLength: 500)
							html
						}
					}
				}
			}
		`
	);

	const projects = data.projects.edges;

	return (
		<div
			id="main"
			ref={setWrapperRef}
			style={timeout ? { display: 'flex' } : { display: 'none' }}>
			<article
				id="intro"
				className={`${article === 'intro' ? 'active' : ''} ${
					articleTimeout ? 'timeout' : ''
				}`}
				style={{ display: 'none' }}>
				<h2 className="major">Intro</h2>
				<span className="image main">
					<Img
						fluid={data.intro.image.fluid}
						alt="James Brunner"
						title="My headshot"
					/>
				</span>

				<p>
					Hello, I'm <span css={highlightStyle}>James Brunner</span>,
					the founding member and principal engineer at{' '}
					<span css={highlightStyle}>
						Brunner Technical Services LLC
					</span>
					. I specialize in full-stack software development for IIoT,
					equipment automation and system analytics. I have the skills
					and experience to create modern and intuitive web-based,
					mobile native and enterprise software applications and
					interfaces for a variety of equipment and industrial
					infrastructure.
				</p>

				<p>
					With 23+ years of software development experience, I have
					delivered quality software and participated in or lead
					projects ranging from{' '}
					<span css={highlightStyle}>enterprise application</span>{' '}
					designs to{' '}
					<span css={highlightStyle}>mobile test equipment</span>{' '}
					interfaces, and from{' '}
					<span css={highlightStyle}>
						web applications and portal
					</span>{' '}
					development to{' '}
					<span css={highlightStyle}>IIoT and embedded hardware</span>{' '}
					solutions.
				</p>

				<p>
					Peruse{' '}
					<a
						href="#work"
						onClick={e => {
							handleSwitchArticle('work', e);
						}}>
						my portfolio
					</a>{' '}
					to get an idea of the project work I do.
				</p>

				<p>
					I can integrate with your existing team or lead your project
					from inception through release, and you'll always get a
					solid, well-documented and easily maintained product.
				</p>

				<p>
					<a
						href="#contact"
						onClick={e => {
							handleSwitchArticle('contact', e);
						}}>
						Contact me now
					</a>{' '}
					to discuss the details of your project!
				</p>

				{close}
			</article>

			<article
				id="work"
				className={`${article === 'work' ? 'active' : ''} ${
					articleTimeout ? 'timeout' : ''
				}`}
				style={{ display: 'none' }}>
				<h2 className="major">Work</h2>
				<span className="image main">
					<Img
						fluid={data.work.image.fluid}
						title="Laptop on desk book stacks"
						alt="by freddie marriage on Unsplash"
					/>
				</span>

				<p>
					Over the past 23+ years I've worked on a wide variety of
					software projects. Some of these were deeply intertwined
					with specialized hardware, some leveraged the traditional
					client-server enterprise model, and some pushed on the then
					state-of-the-art technologies that have become commonplace
					today, like cloud- and subscription-based applications.
				</p>

				<p>
					My software design philosophy is heavily influenced by my
					desire to{' '}
					<span css={highlightStyle}>keep things simple</span>. My
					code is well documented and easy to follow, troubleshoot, or
					enhance. My user interfaces are crisp and clean and follow
					modern stylistic approaches that enable users to intuitively
					understand how they work.
				</p>

				<p>
					Click through my{' '}
					<span css={highlightStyle}>project portfolio</span> below
					for more detailed explanations.
				</p>

				<ul css={projectListStyle}>
					{projects.map(({ node }, idx) => (
						<li key={node.id}>
							<button
								onClick={e => {
									handleSwitchArticle('project_' + idx, e);
								}}>
								{node.frontmatter.title}
							</button>

							<p>{node.excerpt}</p>
						</li>
					))}
				</ul>

				{close}
			</article>

			<article
				id="about"
				className={`${article === 'about' ? 'active' : ''} ${
					articleTimeout ? 'timeout' : ''
				}`}
				style={{ display: 'none' }}>
				<h2 className="major">About</h2>
				<span className="image main">
					<Img
						fluid={data.about.image.fluid}
						title="An open empty notebook on a white desk next to an iPhone and a MacBook"
						alt="by JESHOOTS.COM on Unsplash"
					/>
				</span>

				<p>
					I have been fortunate to have worked with some
					<span css={highlightStyle}>
						{' '}
						incredibly talented people
					</span>{' '}
					over the years. They have influenced my style, character,
					and work ethic.
				</p>

				<p>Here is what they have to say about me:</p>

				{close}
			</article>

			<article
				id="contact"
				className={`${article === 'contact' ? 'active' : ''} ${
					articleTimeout ? 'timeout' : ''
				}`}
				style={{ display: 'none' }}>
				<h2 className="major">Contact</h2>

				<ContactForm done={onCloseArticle} />

				{close}
			</article>

			{projects.map(({ node }, idx) => {
				const id = 'project_' + idx;
				return (
					<article
						key={id}
						id={id}
						className={`${article === id ? 'active' : ''} ${
							articleTimeout ? 'timeout' : ''
						}`}
						style={{ display: 'none' }}>
						<h2 className="major">{node.frontmatter.title}</h2>

						<span className="image main">
							<Img
								fluid={
									node.frontmatter.featureImage.image.fluid
								}
								title={node.frontmatter.title}
								alt={node.frontmatter.date}
							/>
						</span>

						<div dangerouslySetInnerHTML={{ __html: node.html }} />

						<div
							className="close"
							onClick={e => handleSwitchArticle('work', e)}
						/>
					</article>
				);
			})}
		</div>
	);
};

Main.propTypes = {
	timeout: PropTypes.bool,
	setWrapperRef: PropTypes.func.isRequired,
	article: PropTypes.string,
	articleTimeout: PropTypes.bool,
	onCloseArticle: PropTypes.func,
};

export default Main;
