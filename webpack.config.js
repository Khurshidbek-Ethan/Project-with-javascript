const path = require('path')


module.exports = {
	//  1. mode prodaction tez ishlaydi codeni oqish qiyin va
	//  2. development bor sekin ishlaydi lekin codeni oqishi oson ,xozir dastur ishlab chiqyatganimiz un  development qilamiz
	mode: 'development',
	entry: './js/script.js',
	// output script.js simizga ulangan xar bir js filelarni  yigib beradida output qilib bundle.js filega xammasini qapishtirib qoyadi
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	// watch true qilsak js filarimizni ozgarishini kutib turadi va filelar ozgargandan keyin auto ravishda bundle.jsga ozgartirlgan fileni qoyib beradi
	watch: true,
	//source-map qiladigon bolsek ozimiz yozgan js filelarni korishimiz mumkin browserni Sources degan joydan
	devtool: 'source-map',
	module: {},
}
