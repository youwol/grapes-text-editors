const apiVersion = "002"
const externals = {
    "@youwol/flux-view": "@youwol/flux-view_APIv01",
    "rxjs": "rxjs_APIv6",
    "@youwol/http-clients": "@youwol/http-clients_APIv01",
    "@youwol/fv-tabs": "@youwol/fv-tabs_APIv01",
    "@youwol/fv-group": "@youwol/fv-group_APIv01",
    "grapesjs": "grapesjs_APIv018"
}
const path = require('path')
const pkg = require('./package.json')
const ROOT = path.resolve(__dirname, 'src')
const DESTINATION = path.resolve(__dirname, 'dist')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const assetId = Buffer.from(pkg.name).toString('base64')

module.exports = {
    context: ROOT,
    entry: {
        main: './index.ts',
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: './bundle-analysis.html',
            openAnalyzer: false,
        }),
    ],
    output: {
        path: DESTINATION,
        publicPath: `/api/assets-gateway/raw/package/${assetId}/${pkg.version}/dist/`,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: `${pkg.name}_APIv${apiVersion}`,
        filename: pkg.name + '.js',
        globalObject: `(typeof self !== 'undefined' ? self : this)`,
    },
    resolve: {
        extensions: ['.ts', 'tsx', '.js'],
        modules: [ROOT, 'node_modules'],
    },
    externals,
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{ loader: 'ts-loader' }],
                exclude: /node_modules/,
            },
        ],
    },
    devtool: 'source-map',
}
