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
            { 
                text: '总结', link: '/summary/',
                items:[
                    {text:'nginx',link:'/summary/nginx/'},
                    {text:'npm',link:'/summary/npm/'},
                    {text:'webpack',link:'/summary/webpack/'}
                ]
            }
        ]
    }
}