/**
 * Each of the functions here will be copied in a <script> element in the canvas document
 * No reference to external symbols is allowed.
 * Implicit argument: 'this' variable is bound to the HTMLElement being rendered
 */
export function renderTikz() {
    this.innerHTML = ``
    const defaultSrc = String.raw`
\begin{tikzpicture}
    \draw (0,0) circle (1in);
\end{tikzpicture}
`
    const src = this.getAttribute('src') || defaultSrc

    const cdnClient = window['@youwol/cdn-client']
    const elemHTML: HTMLElement = this
    elemHTML.style.setProperty('height', '250px')
    elemHTML.style.setProperty('position', 'relative')
    const loadingScreen = new cdnClient.LoadingScreenView({
        container: elemHTML,
        logo: `<div style='font-size:x-large'>Tikz</div>`,
        wrapperStyle: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            'font-weight': 'bolder',
        },
    })
    loadingScreen.render()
    cdnClient
        .install({
            modules: ['tikzjax'],
            css: ['tikzjax#1.0.0~dist/fonts.css'],
            onEvent: (ev) => {
                loadingScreen.next(ev)
            },
        })
        .then(({ tikzjax }) => {
            return tikzjax.load()
        })
        .then(({ parse }) => {
            console.log('SRC', src)
            return parse(src)
        })
        .then((div) => {
            loadingScreen.done()
            this.appendChild(div)
            elemHTML.style.setProperty('height', 'auto')
        })
}
