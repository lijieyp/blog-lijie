module.exports = {
    base: '/blog-lijie/',
    title: '李杰的博客',
    description: 'Vuepress blog lijie',
    themeConfig: {
        // 你的GitHub仓库，请正确填写
        repo: 'https://github.com/lijieyp/blog-lijie',
        // 自定义仓库链接文字。
        repoLabel: 'My GitHub',
        displayAllHeaders: true,
        sidebar: 'auto',
        sidebarDepth: 2,
        nav: [
            { text: '首页', link: '/' },
            { text: 'nginx', link: '/summary/nginx/' },
            { text: 'webpack', link: '/summary/webpack/' },
            { text: 'git', link: '/summary/git/' },
            { text: 'vue', link: '/summary/vue/' },
            { 
                text: '总结', link: '/summary/',
                items:[
                    { text: 'npm', link: '/summary/npm/' },
                    {text:'面试',link:'/summary/mianshi/'},
                ]
            }
        ],
        sidebar:{
            '/summary/webpack/':[
                '',
                '/summary/webpack/webpack_loader'
            ],
            '/summary/nginx/':[
                '',
            ],
            '/summary/npm/':[
                '',
            ],
            '/summary/git/':[
                '',
            ],
            '/summary/vue/':[
                '',
                '/summary/vue/compatible'
            ]
        }
    }
}