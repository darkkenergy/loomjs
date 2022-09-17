module.exports = ({ htmlWebpackPlugin }) => `
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>${htmlWebpackPlugin.options.title}</title>
		<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
		<link rel="manifest" href="/assets/site.webmanifest">
	</head>
	<body>
		<div id="app-root"></div>
		<noscript>You need to enable JavaScript to run this app.</noscript>
		${htmlWebpackPlugin.tags.bodyTags}
	</body>
	</html>
`;
