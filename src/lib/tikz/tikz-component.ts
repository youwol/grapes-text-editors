import { AppState } from '../utils'
import * as grapesjs from 'grapesjs'
import { renderTikz } from '../runner/tikz/renderer'
import { BehaviorSubject } from 'rxjs'
import { TikzHeaderView } from '../code-editor/code-editor'
import { TikzComponentName } from '../constants'

const codeMirrorConfiguration = {
    value: '',
    mode: 'js',
    lineNumbers: true,
    theme: 'blackboard',
    lineWrapping: true,
    indentUnit: 4,
}

export class TikzComponent {
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
        this.componentType = this.idFactory(TikzComponentName)

        this.model = this.getModel()
        this.view = this.getView()
    }

    getModel() {
        return {
            initialize() {
                this.on('change:attributes:implicit', () => {
                    this.view.render()
                })
            },
            defaults: {
                script: renderTikz,
                tagName: 'div',
                droppable: false,
                attributes: {
                    componentType: this.componentType,
                },
                traits: [
                    {
                        type: 'checkbox',
                        name: 'implicit',
                        label: 'Define as function',
                        value: false,
                    },
                ],
            },
        }
    }

    getView() {
        const defaultSrc = String.raw`
\begin{tikzpicture}
    \draw (0,0) circle (1in);
\end{tikzpicture}
`
        return {
            events: {
                dblclick: 'editTikz',
            },
            editTikz: () => {
                const component = this.grapesEditor.getSelected()
                if (!component.getAttributes().src) {
                    component.addAttributes({ src: defaultSrc })
                }
                const src$ = new BehaviorSubject(component.getAttributes().src)
                this.appState.editCode({
                    headerView: (state) =>
                        new TikzHeaderView({
                            state,
                            run: () => {
                                component.view.render()
                            },
                        }),
                    content$: src$,
                    configuration: codeMirrorConfiguration,
                    requirements: {
                        scripts: ['codemirror#5.52.0~mode/javascript.min.js'],
                        css: [],
                    },
                })
                src$.subscribe((src) => {
                    component && component.addAttributes({ src })
                })
            },
        }
    }
}
