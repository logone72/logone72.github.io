export default {
    title: 'logone72 blog',
    description: 'frontend developer logone72 blog',
    // base: '',

    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Blog', link: '/노트/' },
            { text: 'External', link: 'https://google.com' },
        ],
        sidebar: [
            {
                text: "머리", items: [
                    { text: "🏛 노트", link: "/노트/" },
                ],
            },
        ]
    },
}