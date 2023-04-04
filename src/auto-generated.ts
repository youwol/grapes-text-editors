
const runTimeDependencies = {
    "externals": {
        "@youwol/flux-view": "^1.0.3",
        "rxjs": "^6.5.5",
        "@youwol/http-clients": "^1.0.2",
        "@youwol/fv-tabs": "^0.2.1",
        "@youwol/fv-group": "^0.2.1"
    },
    "includedInBundle": {}
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
    },
    "rxjs/operators": {
        "commonjs": "rxjs/operators",
        "commonjs2": "rxjs/operators",
        "root": [
            "rxjs_APIv6",
            "operators"
        ]
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

const mainEntry : {entryFile: string,loadDependencies:string[]} = {
    "entryFile": "./index.ts",
    "loadDependencies": [
        "@youwol/flux-view",
        "rxjs",
        "@youwol/http-clients",
        "@youwol/fv-tabs",
        "@youwol/fv-group"
    ]
}

const secondaryEntries : {[k:string]:{entryFile: string, name: string, loadDependencies:string[]}}= {}

const entries = {
     '@youwol/grapes-text-editors': './index.ts',
    ...Object.values(secondaryEntries).reduce( (acc,e) => ({...acc, [`@youwol/grapes-text-editors/${e.name}`]:e.entryFile}), {})
}
export const setup = {
    name:'@youwol/grapes-text-editors',
        assetId:'QHlvdXdvbC9ncmFwZXMtdGV4dC1lZGl0b3Jz',
    version:'0.1.4-wip',
    shortDescription:"Various components for grapes to edit text (markdown, latex, etc) from YouWol team.",
    developerDocumentation:'https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/grapes-text-editors',
    npmPackage:'https://www.npmjs.com/package/@youwol/grapes-text-editors',
    sourceGithub:'https://github.com/youwol/grapes-text-editors',
    userGuide:'https://l.youwol.com/doc/@youwol/grapes-text-editors',
    apiVersion:'01',
    runTimeDependencies,
    externals,
    exportedSymbols,
    entries,
    secondaryEntries,
    getDependencySymbolExported: (module:string) => {
        return `${exportedSymbols[module].exportedSymbol}_APIv${exportedSymbols[module].apiKey}`
    },

    installMainModule: ({cdnClient, installParameters}:{
        cdnClient:{install:(unknown) => Promise<Window>},
        installParameters?
    }) => {
        const parameters = installParameters || {}
        const scripts = parameters.scripts || []
        const modules = [
            ...(parameters.modules || []),
            ...mainEntry.loadDependencies.map( d => `${d}#${runTimeDependencies.externals[d]}`)
        ]
        return cdnClient.install({
            ...parameters,
            modules,
            scripts,
        }).then(() => {
            return window[`@youwol/grapes-text-editors_APIv01`]
        })
    },
    installAuxiliaryModule: ({name, cdnClient, installParameters}:{
        name: string,
        cdnClient:{install:(unknown) => Promise<Window>},
        installParameters?
    }) => {
        const entry = secondaryEntries[name]
        if(!entry){
            throw Error(`Can not find the secondary entry '${name}'. Referenced in template.py?`)
        }
        const parameters = installParameters || {}
        const scripts = [
            ...(parameters.scripts || []),
            `@youwol/grapes-text-editors#0.1.4-wip~dist/@youwol/grapes-text-editors/${entry.name}.js`
        ]
        const modules = [
            ...(parameters.modules || []),
            ...entry.loadDependencies.map( d => `${d}#${runTimeDependencies.externals[d]}`)
        ]
        return cdnClient.install({
            ...parameters,
            modules,
            scripts,
        }).then(() => {
            return window[`@youwol/grapes-text-editors/${entry.name}_APIv01`]
        })
    },
    getCdnDependencies(name?: string){
        if(name && !secondaryEntries[name]){
            throw Error(`Can not find the secondary entry '${name}'. Referenced in template.py?`)
        }
        const deps = name ? secondaryEntries[name].loadDependencies : mainEntry.loadDependencies

        return deps.map( d => `${d}#${runTimeDependencies.externals[d]}`)
    }
}
