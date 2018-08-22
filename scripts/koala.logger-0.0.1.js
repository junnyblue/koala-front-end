! function ($) {
    $.extend(true, koala, {
        logger: {
            URL: "",
            root : "DEBUG",
            dir: function (msg) {
                logger.log($.param(msg));
            },
            error: function (msg) {
                logger.log(msg, "ERROR");
            },
            debug: function (msg) {
                logger.log(msg, "DEBUG");
            },
            info: function (msg) {
                logger.log(msg, "INFO");
            },
            warning: function (msg) {
                logger.log(msg, "WARNING");
            },
            log: function (message, level) {
                if (koala.islogwriting && logger.URL) {
                    level = level || logger.root;
                    new Image().src = logger.URL + "?level=" + level + "&message=[PAGE]" + message;
                }
            }
        },
        setupLogger: function (config) {
            if (koala.isExists(config)) {
                $.extend(koala.logger, config);
            }
        },
        islogwriting: false,
        loggeron: function () {
            koala.islogwriting = true;
        },
        loggeroff: function () {
            koala.islogwriting = false;
        }
    });

    window.logger = koala.logger;
    window.console = window.console || koala.logger;
    console.log ||
        (console.log = window.opera ? opera.postError : koala.logger.log);
    console.dir || (console.dir = koala.logger.dir);

}(jQuery);
