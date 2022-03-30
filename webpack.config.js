const path = require('path')
const ROOT = path.resolve(__dirname, 'src')
const DESTINATION = path.resolve(__dirname, 'dist')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const packageJson = require('./package.json')
const assetId = Buffer.from(packageJson.name).toString('base64')
module.exports = {
    context: ROOT,
    entry: {
        [packageJson.name]: './lib/index.ts',
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: './bundle-analysis.html',
            openAnalyzer: false,
        }),
    ],
    output: {
        publicPath: `/api/assets-gateway/raw/package/${assetId}/${packageJson.version}/dist/`,
        path: DESTINATION,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: packageJson.name,
        filename: packageJson.name + '.js',
        globalObject: `(typeof self !== 'undefined' ? self : this)`,
    },
    resolve: {
        extensions: ['.ts', 'tsx', '.js'],
        modules: [ROOT, 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{ loader: 'ts-loader' }],
                exclude: /node_modules/,
            },
        ],
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            root: '_',
        },
        rxjs: 'rxjs',
        'rxjs/operators': {
            commonjs: 'rxjs/operators',
            commonjs2: 'rxjs/operators',
            root: ['rxjs', 'operators'],
        },
        '@youwol/cdn-client': '@youwol/cdn-client',
        '@youwol/flux-view': '@youwol/flux-view',
        '@youwol/fv-group': '@youwol/fv-group',
        '@youwol/fv-tabs': '@youwol/fv-tabs',
        '@youwol/http-clients': '@youwol/http-clients',
        grapesjs: 'grapesjs',
    },
    devtool: 'source-map',
}
