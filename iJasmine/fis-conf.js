/**
 *
 * @file overview fis前端静态资源管理配置文件
 *
 */

//合并工具
fis.config.set('modules.postpackager', 'simple');


fis.config.merge({

    project: {
        'charset'     : 'utf8', //静态文件使用的编码
        'md5Length'   : 7, //文件名后的md5值
        'md5Connector': '_'
    },

    pack: {
        'pkg/jquery-angular-lib.js': [
            '/js/lib/jquery/jquery-3.2.1.min.js',
            '/js/lib/angular-1.3.0/angular.min.js',
            '/js/lib/angular-dialog/ngDialog.min.js',
            '/js/lib/jquery/jquery-scroll-banner.js'
        ],
        'pkg/app.js': [
            '/js/app.js',
            '/js/controllers/home-ctrl.js',
            '/js/controllers/destination-ctrl.js',
            '/js/controllers/custom-ctrl.js',
            '/js/controllers/travels-ctrl.js',
            '/js/controllers/sample-ctrl.js',
            '/js/directives/new-zealand-map-directive.js',
        ]
    },
    roadmap: {

        path: [
            {
                reg : '*.html',
                release: '/$&'
            },
            {
                reg: '/src/imgs/**',
                useHash: false,
                release: '/$&'
            }
        ]

    },
    deploy:{

    }
});

//开启自动合并将会把每一个html页面中的零散(即没有在pack中定义的文件)静态文件合并成一个文件，
/*
fis.config.set('settings.postpackager.simple.autoCombine', true);
fis.config.set('settings.postpackager.simple.output', 'pkg/auto_combine_${hash}'); //设置自动合并文件目录
*/
