// Copyright © 2021 Cai Hai. All Rights Reserved.

// 此文件存储页面内容 json 数组化的所有 json 数组数据

// 头像
// 头像只允许创建一个 json 对象

var avatarDataJson = [
    {
        // 超链接
        'aHref': '',
        // 图片链接
        'imgSrc': 'img/development.png'
    }
]

// 徽标
// 徽标只允许创建一个 json 对象，推荐图片尺寸：200 * 65

var logoDataJson = [
    {
        // 图片链接
        'imgSrc': 'img/minimalist.png'
    }
]

// 个性签名
// 个性签名只允许创建一个 json 对象，文本尽量简短

var signatureDataJson = [
    {
        // 文本
        'pText': '永远保持理智选择和接受坏事的心态'
    }
]

// 常用站点

// 常用站点可随意创建 json 对象，文本尽量简短
// 图标使用的是 Font Awesome Free 5.15.1，网址：https://fontawesome.com

var websiteDataJson = [
    {
        // 超链接
        'aHref': '',
        // 超链接提示文本
        'aTitle': 'Minimalist',
        // 图标
        'iClass': 'fas fa-home'
    }
]

// 聚合搜索

// 关于下方两个 json 数组内的对象里出现的链接和参数的名称和值的一些说明
// 比如，当我们在必应搜索页面的搜索框中搜索问题并回车后，地址栏里的链接一般是这样子的：https://cn.bing.com/search?q=问题
// 链接知道了，那么现在就来解析一下这条链接：
// 链接里 ? 前面那部分便是对象需要的链接：https://cn.bing.com/search
// 链接里 ? 和 = 之间的字母便是对象需要的参数：q
// 链接里 = 后面的便是我们在搜索框中输入的问题
// 这个解析方法基本上适用于所有搜索引擎和绝大部分网站

// 聚合搜索 - 默认搜索引擎
// 默认搜索引擎只允许创建一个 json 对象

var searchBoxDataJson = [
    {
        // 链接
        'formAcrion': 'https://cn.bing.com/search',
        // 图标
        'imgSrc': 'img/bing.png',
        // 参数
        'inputName': 'q'
    }
]

// 聚合搜索 - 搜索引擎列表
// 搜索引擎列表可随意创建多个 json 对象，文本尽量简短，超出部分会以省略号显示

var searchEngineListDataJson = [
    {
        // 链接
        'liUrl': 'https://cn.bing.com/search',
        // 参数
        'liName': 'q',
        // 图标
        'liImgSrc': 'img/bing.png',
        // 文本
        'liText': '必应'
    },
    {
        // 链接
        'liUrl': 'https://www.google.com/search',
        // 参数
        'liName': 'q',
        // 图标
        'liImgSrc': 'img/google.png',
        // 文本
        'liText': '谷歌'
    },
    {
        // 链接
        'liUrl': 'https://www.baidu.com/s',
        // 参数
        'liName': 'wd',
        // 图标
        'liImgSrc': 'img/baidu.png',
        // 文本
        'liText': '百度'
    }
]

// 页脚
// 页脚可随意创建多个 json 对象，文本尽量简短

var footerDataJson = [
    {
        // 文本
        'pText': 'Copyright © 2021 <a href="">Minimalist</a>. All Rights Reserved.'
    }
]