import * as grapesjs from 'grapesjs'
import { AppState } from '../utils'
import { MathjaxBlockName, MathjaxComponentName } from '../constants'

export class MathjaxBlock {
    public readonly blockType: string
    public readonly label = 'MathJax (latex)'
    public readonly content
    public readonly appState: AppState
    public readonly grapesEditor: grapesjs.Editor
    public readonly idFactory: (name: string) => string
    public readonly render = ({ el }: { el: HTMLElement }) => {
        el.classList.add('gjs-fonts', 'gjs-f-b2')
    }

    constructor(params: {
        appState: AppState
        grapesEditor: grapesjs.Editor
        idFactory: (name: string) => string
    }) {
        Object.assign(this, params)
        this.blockType = this.idFactory(MathjaxBlockName)
        this.content = {
            type: this.idFactory(MathjaxComponentName),
        }
    }
}
