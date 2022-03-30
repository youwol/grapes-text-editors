/**
 * Each of the functions here will be copied in a <script> element in the canvas document
 * No reference to external symbols is allowed.
 * Implicit argument: 'this' variable is bound to the HTMLElement being rendered
 */
export function renderMathjax() {
    this.innerHTML = ``
    const src = this.getAttribute('src') || '\\Huge{e^{i\\pi}-1=0}'
    const parse = () => {
        const MathJax = window['MathJax']
        Promise.resolve().then(() => {
            this.innerHTML = `$$${src}$$`
            MathJax.typesetPromise([this])
        })
    }
    const cdnClient = window['@youwol/cdn-client']
    const elemHTML: HTMLElement = this
    elemHTML.style.setProperty('height', '250px')
    elemHTML.style.setProperty('position', 'relative')
    const loadingScreen = new cdnClient.LoadingScreenView({
        container: elemHTML,
        logo: `<div style='font-size:x-large'>Mathjax</div>`,
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
        .install(
            {
                modules: ['mathjax'],
            },
            {
                onEvent: (ev) => {
                    loadingScreen.next(ev)
                },
            },
        )
        .then(() => {
            loadingScreen.done()
            elemHTML.style.setProperty('height', 'auto')
            parse()
        })
}
