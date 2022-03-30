import { AppState } from '../utils'
import * as grapesjs from 'grapesjs'
import { BehaviorSubject } from 'rxjs'
import { MathjaxHeaderView } from '../code-editor/code-editor'
import { MathjaxComponentName } from '../constants'
import { renderMathjax } from '../runner/mathjax/renderer'

const codeMirrorConfiguration = {
    value: '',
    mode: 'markdown',
    lineNumbers: true,
    theme: 'blackboard',
    lineWrapping: true,
    indentUnit: 4,
}

export class MathjaxComponent {
    public readonly appState: AppState
    public readonly grapesEditor: grapesjs.Editor
    public readonly idFactory: (name: string) => string

    public readonly componentType: string

    public readonly extendFn = ['initialize']
    public readonly isComponent = (el: HTMLElement) => {
        return (
            el.getAttribute &&
            el.getAttribute('componentType') == this.componentType
        )
    }
    public readonly model
    public readonly view

    constructor(params: {
        appState: AppState
        grapesEditor: grapesjs.Editor
        idFactory: (name: string) => string
    }) {
        Object.assign(this, params)
        this.componentType = this.idFactory(MathjaxComponentName)

        this.model = this.getModel()
        this.view = this.getView()
    }

    getModel() {
        return {
            initialize() {
                this.on('change:attributes:mathjax', () => {
                    this.view.render()
                })
            },
            defaults: {
                script: renderMathjax,
                tagName: 'div',
                droppable: false,
                attributes: {
                    componentType: this.componentType,
                },
            },
        }
    }

    getView() {
        return {
            events: {
                dblclick: 'editLatex',
            },
            editLatex: () => {
                const component = this.grapesEditor.getSelected()
                if (!component.getAttributes().src) {
                    component.addAttributes({ src: '\\Huge{e^{i\\pi}-1=0}' })
                }
                const src$ = new BehaviorSubject(component.getAttributes().src)
                this.appState.editCode({
                    headerView: (state) => new MathjaxHeaderView({ state }),
                    content$: src$,
                    configuration: codeMirrorConfiguration,
                    requirements: {
                        scripts: [
                            'codemirror#5.52.0~mode/javascript.min.js',
                            'codemirror#5.52.0~mode/css.min.js',
                            'codemirror#5.52.0~mode/xml.min.js',
                            'codemirror#5.52.0~mode/htmlmixed.min.js',
                        ],
                        css: [],
                    },
                })
                src$.subscribe((src) => {
                    component && component.addAttributes({ src })
                    component.view.render()
                })
            },
        }
    }
}
