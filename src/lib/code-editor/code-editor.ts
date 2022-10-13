import { combineLatest, Subject } from 'rxjs'
import { HTMLElement$, VirtualDOM } from '@youwol/flux-view'
import { popupEmojisBrowserModal } from './emoji-picker.view'

export class MarkdownHeaderView {
    public readonly state
    public readonly emojis$ = new Subject<string>()
    public readonly children: VirtualDOM[]
    public readonly connectedCallback: (
        elem: HTMLElement$ & HTMLDivElement,
    ) => void

    constructor(params) {
        Object.assign(this, params)

        this.children = [
            {
                class: 'd-flex w-100 align-items-center',
                children: [
                    {
                        tag: 'i',
                        class: 'fv-pointer rounded m-1 fas fa-smile editor-view-header-emoji',
                        onclick: () => popupEmojisBrowserModal(this.emojis$),
                    },
                ],
            },
        ]
        this.connectedCallback = (elem: HTMLElement$ & HTMLDivElement) => {
            elem.ownSubscriptions(
                combineLatest([
                    this.state.codeMirrorEditor$,
                    this.emojis$,
                ]).subscribe(([cm, emoji]) => {
                    const doc = cm['getDoc']()
                    const cursor = doc.getCursor()
                    doc.replaceRange(emoji, cursor)
                }),
            )
        }
    }
}

export class MathjaxHeaderView {
    public readonly children: VirtualDOM[] = []

    constructor(params) {
        Object.assign(this, params)
    }
}

export class TikzHeaderView {
    public readonly children: VirtualDOM[] = []
    public readonly state

    constructor({ state, run }) {
        Object.assign(this, { state, run })
        this.children = [
            {
                class: 'd-flex w-100 align-items-center',
                children: [
                    {
                        tag: 'i',
                        class: 'fv-pointer rounded m-1 fas fa-play editor-view-header-run',
                        onclick: () => run(),
                    },
                ],
            },
        ]
    }
}
