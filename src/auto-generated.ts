
const runTimeDependencies = {
    "load": {
        "@youwol/flux-view": "^1.0.3",
        "rxjs": "^6.5.5",
        "@youwol/http-clients": "^1.0.2",
        "@youwol/fv-tabs": "^0.2.1",
        "@youwol/fv-group": "^0.2.1"
    },
    "differed": {},
    "includedInBundle": []
}
const externals = {
    "@youwol/flux-view": {
        "commonjs": "@youwol/flux-view",
        "commonjs2": "@youwol/flux-view",
        "root": "@youwol/flux-view_APIv1"
    },
    "rxjs": {
        "commonjs": "rxjs",
        "commonjs2": "rxjs",
        "root": "rxjs_APIv6"
    },
    "@youwol/http-clients": {
        "commonjs": "@youwol/http-clients",
        "commonjs2": "@youwol/http-clients",
        "root": "@youwol/http-clients_APIv1"
    },
    "@youwol/fv-tabs": {
        "commonjs": "@youwol/fv-tabs",
        "commonjs2": "@youwol/fv-tabs",
        "root": "@youwol/fv-tabs_APIv02"
    },
    "@youwol/fv-group": {
        "commonjs": "@youwol/fv-group",
        "commonjs2": "@youwol/fv-group",
        "root": "@youwol/fv-group_APIv02"
    }
}
const exportedSymbols = {
    "@youwol/flux-view": {
        "apiKey": "1",
        "exportedSymbol": "@youwol/flux-view"
    },
    "rxjs": {
        "apiKey": "6",
        "exportedSymbol": "rxjs"
    },
    "@youwol/http-clients": {
        "apiKey": "1",
        "exportedSymbol": "@youwol/http-clients"
    },
    "@youwol/fv-tabs": {
        "apiKey": "02",
        "exportedSymbol": "@youwol/fv-tabs"
    },
    "@youwol/fv-group": {
        "apiKey": "02",
        "exportedSymbol": "@youwol/fv-group"
    }
}
export const setup = {
    name:'@youwol/grapes-text-editors',
        assetId:'QHlvdXdvbC9ncmFwZXMtdGV4dC1lZGl0b3Jz',
    version:'0.1.2-wip',
    shortDescription:"Various components for grapes to edit text (markdown, latex, etc) from YouWol team.",
    developerDocumentation:'https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/grapes-text-editors',
    npmPackage:'https://www.npmjs.com/package/@youwol/grapes-text-editors',
    sourceGithub:'https://github.com/youwol/grapes-text-editors',
    userGuide:'https://l.youwol.com/doc/@youwol/grapes-text-editors',
    apiVersion:'01',
    runTimeDependencies,
    externals,
    exportedSymbols,
    getDependencySymbolExported: (module:string) => {
        return `${exportedSymbols[module].exportedSymbol}_APIv${exportedSymbols[module].apiKey}`
    }
}
