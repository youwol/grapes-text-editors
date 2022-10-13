import { MarkdownBlock } from './markdown/markdown-block'
import { MarkdownComponent } from './markdown/markdown-component'
import { MathjaxBlock } from './mathjax/mathjax-block'
import { MathjaxComponent } from './mathjax/mathjax-component'
import { TikzBlock } from './tikz/tikz-block'
import { TikzComponent } from './tikz/tikz-component'

export function getBlocks() {
    return [MarkdownBlock, MathjaxBlock, TikzBlock]
}

export function getComponents() {
    return [MarkdownComponent, MathjaxComponent, TikzComponent]
}
