define(['jquery'], function($) {
    $(function() {
        if(location.hash =="#login"){
            loads(hashToPath('login'));
        }else{
            location.hash = "#login";
        }
        loads(hashToPath(location.hash));
        /*
         监听hashchange切换view
         */
        $(window).on('hashchange', function (e) {
            var hash = location.hash;
            if(hash.indexOf('_') !== -1){
                hash = hash.substring(0, hash.indexOf('_'));
            }
            loads(hashToPath(hash));

        });
        function hashToPath(hash) {
            if (hash.indexOf('#') !== -1) {
                hash = hash.substring(1);
            }
            return 'app/' + hash + '/' + hash;
        }
        function loads(path) {
            require([path], function(view) {
                view.load();
            });
        }
    });
});