import { MarkdownBlock } from './markdown/markdown-block'
import { MarkdownComponent } from './markdown/markdown-component'
import { MathjaxBlock } from './mathjax/mathjax-block'
import { MathjaxComponent } from './mathjax/mathjax-component'

export function getBlocks() {
    return [MarkdownBlock, MathjaxBlock]
}

export function getComponents() {
    return [MarkdownComponent, MathjaxComponent]
}
