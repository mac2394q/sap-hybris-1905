/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
angular.module('templateCacheDecoratorModule', [])
    .config(function($provide) {

        var pathRegExp = /web.+\/(\w+)\.html/;
        var namePathMap = {};

        $provide.decorator('$templateCache', ['$delegate', function($delegate) {

            var originalPut = $delegate.put;

            $delegate.put = function() {
                var path = arguments[0];
                var template = arguments[1];
                if (pathRegExp.test(path)) {
                    var fileName = pathRegExp.exec(path)[1] + ".html";
                    if (!namePathMap[fileName]) {

                        originalPut.apply($delegate, [fileName, template]);
                        namePathMap[fileName] = path;
                    } else {
                        throw "[templateCacheDecorator] html templates '" + namePathMap[fileName] + "' and '" + path + "' are conflicting, you must give them different filenames";
                    }
                }
                return originalPut.apply($delegate, arguments);
            };

            // ============== UNCOMMENT THIS TO DEBUG TEMPLATECACHE ==============
            // ========================== DO NOT COMMIT ==========================
            // var originalGet = $delegate.get;
            //
            // $delegate.get = function() {
            //     var path = arguments[0];
            //     var $log = angular.injector(['ng']).get('$log');
            //
            //     $log.debug("$templateCache GET: " + path);
            //     return originalGet.apply($delegate, arguments);
            // };

            return $delegate;
        }]);
    });
