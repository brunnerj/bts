module.exports = {
	siteMetadata: {
		title: "Brunner Technical Services LLC",
		author: "James Brunner",
		description: "A small sampling of our capabilities."
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: 'brunner-technical-services',
				short_name: 'bts',
				start_url: '/',
				background_color: '#663399',
				theme_color: '#663399',
				display: 'minimal-ui',
				icon: 'src/images/icon.png', // This path is relative to the root of the site.
			},
		},
		'gatsby-plugin-sass',
		'gatsby-plugin-offline'
	],
}
