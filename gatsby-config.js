const targetAddress = new URL(
	process.env.TARGET_ADDRESS || `http://brunnertechnicalservices.local`
);

module.exports = {
	siteMetadata: {
		title: 'Brunner Technical Services LLC',
		author: 'James Brunner',
		description: 'A small sampling of our capabilities.',
	},
	plugins: [
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'projects',
				path: `${__dirname}/src/projects`,
			},
		},
		'gatsby-plugin-sass',
		'gatsby-plugin-offline',
		'gatsby-plugin-emotion',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				excerpt_separator: `<!-- end -->`,
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 760,
							wrapperStyle: {},
							linkImagesToOriginal: false,
						},
					},
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-copy-images',
					'gatsby-remark-smartypants',
				],
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
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
		{
			resolve: 'gatsby-plugin-s3',
			options: {
				bucketName: process.env.TARGET_BUCKET_NAME || 'fake-bucket',
				region: process.env.AWS_REGION,
				protocol: targetAddress.protocol.slice(0, -1),
				hostname: targetAddress.hostname,
				acl: null,
				params: {
					// In case you want to add any custom content types:
					// https://github.com/jariz/gatsby-plugin-s3/blob/master/recipes/custom-content-type.md
				},
			},
		},
		{
			resolve: 'gatsby-plugin-canonical-urls',
			options: {
				siteUrl: targetAddress.href.slice(0, -1),
			},
		},
	],
};
