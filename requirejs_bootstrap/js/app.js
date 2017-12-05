requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        jquery: 'jquery',
        app: '../app'
    }
});
require(['app/main'], function() {
});