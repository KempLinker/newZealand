module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt); //加载所有的任务

    // 配置Grunt各种模块的参数
    grunt.initConfig({
        connect: {
            options: {
                hostname:'0.0.0.0',
                open:false
            },

            web:{
                proxies: [
                    {
                        context: '/api',
                        changeOrigin:true,
                        host: '127.0.0.1',
                        port: 9999,
                        https: false
                    }
                ]
            },
            newZealand: {
                options: {
                    port: 9999,
                    protocol: "http",
                    middleware: function(connect) {
                        return [
                            require('grunt-connect-proxy/lib/utils').proxyRequest,
                            connect.static('newZealand')
                        ];
                    }
                }
            },
            build: {
                options: {
                    port:9999,
                    middleware: function (connect) {
                        return [
                            require('grunt-connect-proxy/lib/utils').proxyRequest,
                            connect.static('build')
                        ];
                    }
                }
            }

        },
        watch: {
            newZealandScss: {
                files: ['web/sass/*.scss'],
                tasks: ['sass:newZealandScss']
            }
        },
        sass: {
            newZealandScss: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: [
                    {
                        'web/sass/release/release.css': 'web/sass/init.scss'
                    }
                ]
            }
        }
    });

    // 从node_modules目录加载模块文件
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.event.on('watch', function(action, filepath, target) {
        if (target === 'runOneScss' && action === 'changed') {
            grunt.config('sass.runOneScss.src', filepath);
            var destCss = filepath.replace(/\/scss\//, '/css/').replace(/(\.scss)$/, '.css');
            grunt.config('sass.runOneScss.dest', destCss);
        }
    });
    // 每行registerTask定义一个任务
    //grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('web',
        [
            'configureProxies:web',
            'connect:newZealand',
            'watch'
        ]
    );
    grunt.registerTask('build',
        [
            'configureProxies:web',
            'connect:build',
            'watch'
        ]
    );

};

