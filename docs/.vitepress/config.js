import sidebarConfig from './sidebarConfig.json'

export default {
    title: 'logone72 blog',
    description: 'frontend developer logone72 blog',
    head: [
      ['meta', {name: 'google-site-verification', content: 'f5b8urfLVM-IRsORykWqUAMVws-ISJnIYUiFhZDF1rU'}]
    ],

    themeConfig: {
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Github', link: 'https://github.com/logone72/logone72.github.io'},
        ],
        sidebar: sidebarConfig,
    },
}