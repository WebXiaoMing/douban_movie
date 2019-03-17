const {
	override,
	addBabelPlugins,
	disableEsLint,
	addBundleVisualizer,
	addWebpackAlias
 } = require("customize-cra");

 const path = require('path')

module.exports = override(
	...addBabelPlugins(
		["import",
			{ libraryName: 'antd-mobile', style: 'css' }
		]
	),
	addWebpackAlias({
		'components': path.resolve(__dirname, 'src/components'),
		'pages': path.resolve(__dirname, 'src/pages'),
		'store': path.resolve(__dirname, 'src/store'),
		'router': path.resolve(__dirname, 'src/router'),
		'sass': path.resolve(__dirname, 'src/sass'),
		'utils': path.resolve(__dirname, 'src/utils')
	})
)