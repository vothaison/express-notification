'use strict';

var mode = 'debug';
module.exports = {
    getSettings: function(mode) {
        if (mode === 'debug') {
            return {
                fitUrl: 'http://localhost:8088/fit2/',
                saveUrl: 'http://localhost:8088/paper/Bridge/save_fit_json',
                getUrl: 'http://localhost:8088/paper/Bridge/get_latest_fit_json',
                getNotificationSubscriptionsUrl: 'http://localhost:8088/paper/Bridge/list_subscription',
            };
        } else {
            return {
                fitUrl: 'http://fit.sgu.edu.vn/web2017',
                saveUrl: 'https://paper-by-vts.000webhostapp.com/Bridge/save_fit_json',
                getUrl: 'https://paper-by-vts.000webhostapp.com/Bridge/get_latest_fit_json',
                getNotificationSubscriptionsUrl: 'https://paper-by-vts.000webhostapp.com/DataBridge/list_subscription',
            };
        }
    }
};

