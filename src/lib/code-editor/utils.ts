import * as grapesjs from 'grapesjs'
import { BehaviorSubject, Subject } from 'rxjs'
import { withLatestFrom } from 'rxjs/operators'
import { VirtualDOM } from '@youwol/flux-view'
import { AppState } from '../utils'

const codeMirrorBaseConfiguration = {
    lineNumbers: true,
    theme: 'blackboard',
    lineWrapping: false,
    indentUnit: 4,
}

export function editSrcTrait({
    appState,
    attributeName,
    src,
    language,
    grapesEditor,
    requirements,
}: {
    appState: AppState
    attributeName: string
    src: string
    language: string
    grapesEditor
    requirements
}) {
    return {
        name: 'editSrc',
        label: `edit ${attributeName}`,
        type: 'button',
        text: 'Click me',
        full: true, // Full width button
        command: (editor) => {
            const component = editor.getSelected()
            if (!component.getAttributes()[attributeName]) {
                component.addAttributes({
                    [attributeName]: src,
                })
            }
            editCode(
                attributeName,
                appState,
                grapesEditor,
                language,
                requirements,
            )
        },
    }
}

export function editCode(
    srcAttName,
    appState: AppState,
    editor: grapesjs.Editor,
    mode: string,
    requirements,
) {
    const component = editor.getSelected()
    if (!component.getAttributes().src) {
        component.addAttributes({ src: '# Title' })
    }
    const src$ = new BehaviorSubject<string>(
        component.getAttributes()[srcAttName],
    )
    const run$ = new Subject<boolean>()
    run$.pipe(withLatestFrom(src$)).subscribe(([_, src]) => {
        component && component.addAttributes({ [srcAttName]: src })
        component.view.render()
    })
    appState.editCode({
        headerView: () => {
            return new HeaderView({ run$ })
        },
        content$: src$,
        configuration: {
            ...codeMirrorBaseConfiguration,
            mode,
            extraKeys: {
                'Ctrl-Enter': () => {
                    run$.next(true)
                },
            },
        },
        requirements,
    })
}

export class HeaderView {
    public readonly run$: Subject<boolean>
    public readonly children: VirtualDOM[]

    constructor(params: { run$: Subject<boolean> }) {
        Object.assign(this, params)
        this.children = [
            {
                class: 'd-flex w-100 align-items-center',
                children: [
                    {
                        tag: 'i',
                        class: 'fv-pointer rounded m-1 fas fa-save fv-hover-text-focus',
                        onclick: () => this.run$.next(true),
                    },
                ],
            },
        ]
    }
}
