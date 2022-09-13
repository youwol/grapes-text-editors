
const runTimeDependencies = {
    "load": {
        "@youwol/flux-view": "^1.0.0",
        "rxjs": "^6.5.5",
        "@youwol/http-clients": "^1.0.0",
        "@youwol/fv-tabs": "^0.2.0",
        "@youwol/fv-group": "^0.2.0"
    },
    "differed": {},
    "includedInBundle": []
}
const externals = {
    "@youwol/flux-view": "@youwol/flux-view_APIv1",
    "rxjs": "rxjs_APIv6",
    "@youwol/http-clients": "@youwol/http-clients_APIv1",
    "@youwol/fv-tabs": "@youwol/fv-tabs_APIv02",
    "@youwol/fv-group": "@youwol/fv-group_APIv02"
}
export const setup = {
    name:'@youwol/grapes-text-editors',
    assetId:'QHlvdXdvbC9ncmFwZXMtdGV4dC1lZGl0b3Jz',
    version:'0.1.0',
    shortDescription:"Various components for grapes to edit text (markdown, latex, etc) from YouWol team.",
    developerDocumentation:'https://platform.youwol.com/applications/@youwol/cdn-explorer/latest?package=@youwol/grapes-text-editors',
    npmPackage:'https://www.npmjs.com/package/@youwol/grapes-text-editors',
    sourceGithub:'https://github.com/youwol/grapes-text-editors',
    userGuide:'https://l.youwol.com/doc/@youwol/grapes-text-editors',
    apiVersion:'01',
    runTimeDependencies,
    externals
}
