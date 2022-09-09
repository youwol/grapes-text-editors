/**
 * Each of the functions here will be copied in a <script> element in the canvas document
 * No reference to external symbols is allowed.
 * Implicit argument: 'this' variable is bound to the HTMLElement being rendered
 */
export function renderMarkdown() {
    this.innerHTML = ``
    const src = this.getAttribute('src') || '# Dbl click to edit'
    const useMathjax = this.getAttribute('mathjax') != null
    const parse = () => {
        this.innerHTML = window['marked'](src)
        if (useMathjax) {
            const MathJax = window['MathJax']
            Promise.resolve().then(() => {
                MathJax.typesetPromise([this])
            })
        }
    }
    if (
        (!useMathjax && window['marked']) ||
        (useMathjax && window['marked'] && window['MathJax'])
    ) {
        parse()
        return
    }
    const cdnClient = window['@youwol/cdn-client']

    this.style.setProperty('height', '250px')
    this.style.setProperty('position', 'relative')
    const loadingScreen = new cdnClient.LoadingScreenView({
        container: this,
        logo: `<div style='font-size:x-large'>Markdown</div>`,
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
                modules: [
                    ...['marked', 'highlight.js'],
                    ...(useMathjax ? ['mathjax'] : []),
                ],
                css: [
                    {
                        resource: 'highlight.js#11.2.0~styles/default.css',
                        domId: 'highlight',
                    },
                ],
            },
            {
                onEvent: (ev) => {
                    loadingScreen.next(ev)
                },
            },
        )
        .then(() => {
            window['marked'].setOptions({
                langPrefix: 'hljs language-',
                highlight: function (code, lang) {
                    return window['hljs'].highlightAuto(code, [lang]).value
                },
            })
            loadingScreen.done()
            this.style.setProperty('height', 'auto')
            parse()
        })
}
