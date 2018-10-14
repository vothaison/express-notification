'use strict';
var express = require('express');
var fs = require('fs');
var querystring = require('querystring');
var os = require('os');
var http = require('http');
var request = require('request');
var loader = require('../code/loader');
var settings = require('../code/settings').getSettings(os.hostname() === 'THAISON' ? 'debug' : 'deploy');

var router = express.Router();

const HASH = '###############################';

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express by VTS', settings: JSON.stringify(settings, null, 4)});
});

router.get('/ATriggerVerify.txt', function (req, res) {
    var source = fs.readFileSync('public/ATriggerVerify.txt', 'utf8');
    res.send(source);
});

router.get('/trigger_notification', async function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    var data = {
        "List": [
            {
                "date": "2018-09-26 09:39:06",
                "author": " Admin",
                "title": "DCT11811_[Thông báo sau khi họp lớp ngày 25/09]",
                "url": "http://localhost:8088/fit/293.html",
                "string_id": "DCT11811_[Thông báo sau khi họp lớp ngày 25/09]|2018-09-26 09:39:06, Admin",
                "viewed": false
            },
            {
                "date": "2018-09-26 08:35:19",
                "author": " Admin",
                "title":
                    "TB về việc tổ chức hội thảo quốc tế Khởi tạo doanh nghiệp cho sinh viên các trường đại học, cao đẳng trên địa bàn thành phố Hồ Chí Minh",
                "url": "http://localhost:8088/fit/292.html",
                "string_id":
                    "TB về việc tổ chức hội thảo quốc tế Khởi tạo doanh nghiệp cho sinh viên các trường đại học, cao đẳng trên địa bàn thành phố Hồ Chí Minh|2018-09-26 08:35:19, Admin",
                "viewed": false
            },
            {
                "date": "2018-09-25 15:15:18",
                "author": " Admin",
                "title": "TUYỂN DỤNG Ở IVC FRESHER 2018",
                "url": "http://localhost:8088/fit/292.html",
                "string_id": "TUYỂN DỤNG Ở IVC FRESHER 2018|2018-09-25 15:15:18, Admin",
                "viewed": false
            },
            {
                "date": "2018-09-24 07:08:33",
                "author": " Admin",
                "title": "Thông báo họp lớp DCT118  (Khóa 18) với CVHT cập nhật",
                "url": "http://fit.sgu.edu.vn/web2017/detail/290/thong-bao-h-p-l-p-dct118-khoa-18-v-i-cvht/1",
                "string_id": "Thông báo họp lớp DCT118  (Khóa 18) với CVHT cập nhật|2018-09-24 07:08:33, Admin",
                "viewed": false
            },
            {
                "date": "2018-09-24 06:38:06",
                "author": " Admin",
                "title": "Thông báo họp CVHT khóa 18 - Cô Trang - Thầy Đông",
                "url": "http://fit.sgu.edu.vn/web2017/detail/289/thong-bao-h-p-cvht-khoa-18-th-y-dong/1",
                "string_id": "Thông báo họp CVHT khóa 18 - Cô Trang - Thầy Đông|2018-09-24 06:38:06, Admin",
                "viewed": false
            },
            {
                "date": "2018-09-24 06:00:11",
                "author": " Admin",
                "title": "[Thông báo khẩn] Hop lop DCT11811_",
                "url": "http://fit.sgu.edu.vn/web2017/detail/288/thong-bao-kh-n-hop-lop-dct11811/1",
                "string_id": "[Thông báo khẩn] Hop lop DCT11811_|2018-09-24 06:00:11, Admin",
                "viewed": false
            },
            {
                "date": "2018-09-23 15:32:04",
                "author": " Admin",
                "title": "ĐĂNG KÝ DỰ HỘI THẢO BLOCKCHAIN",
                "url": "http://fit.sgu.edu.vn/web2017/detail/287/dang-ky-d-h-i-th-o-blockchain/1",
                "string_id": "ĐĂNG KÝ DỰ HỘI THẢO BLOCKCHAIN|2018-09-23 15:32:04, Admin",
                "viewed": false
            },
            {
                "date": "2018-09-20 08:12:52",
                "author": " Admin",
                "title": "Danh sách lớp và cố vấn học tập khóa 18",
                "url": "http://fit.sgu.edu.vn/web2017/detail/286/danh-sach-l-p-khoa-19/1",
                "string_id": "Danh sách lớp và cố vấn học tập khóa 18|2018-09-20 08:12:52, Admin",
                "viewed": false
            }
        ]
    };

    console.log(HASH);
    console.log('Fetch cached data from database', `(${settings.getUrl})`);
    console.log(HASH);

    var storedData = await new Promise(function (resolve, reject) {
        request.get(settings.getUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log('OK get from', settings.getUrl);
                resolve(body);
            } else {
                console.log('ERROR get from', settings.getUrl);
                reject(error);
            }
        });
    });

    var fit = JSON.parse(storedData).Fit;
    var storedList = [];
    if (fit) {
        storedList = JSON.parse(fit.Json).List;
    }


    console.log(HASH);
    console.log('Fetch new data from official fit.sgu.edu.vn', `(${settings.fitUrl})`);
    console.log(HASH);
    var newData = await new Promise(function (resolve, reject) {
        request.get(settings.fitUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log('OK loaded', settings.fitUrl);
                var list = loader.parseHtml(body);
                var data = { List: list, Date: new Date() };
                resolve(data);

            } else {
                console.log('ERROR', error, body);
                res.send(`ERROR loading  ${settings.fitUrl}  ${JSON.stringify(error)} ${JSON.stringify(response)} ${JSON.stringify(body)}`);
                reject(error);
            }
        });
    });

    var newList = newData.List;

    var reallyNewItems = newList.filter(item => {
        return !storedList.some(stored => {
            return stored.string_id === item.string_id;
        });
    });

    if (!reallyNewItems.length) {
        console.log(HASH);
        console.log('Database cache is up to date');
        console.log(HASH);

        res.send('Database cache is up to date');

    } else {
        // Send notification 
        console.log(HASH);
        console.log('Send notification ');
        console.log(HASH);

        const webpush = require('web-push');

        var subscriptions = await new Promise(function (resolve, reject) {
            request.get(settings.getNotificationSubscriptionsUrl, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log('OK loaded', settings.getNotificationSubscriptionsUrl);
                    resolve(JSON.parse(body).Result);

                } else {
                    console.log('ERROR', error, body);
                    res.send(`ERROR loading  ${settings.getNotificationSubscriptionsUrl}  ${JSON.stringify(error)} ${JSON.stringify(response)} ${JSON.stringify(body)}`);
                    reject(error);
                }
            });
        });

        console.log('subscriptions', subscriptions);



        const publicVapidKey = 'BEWXhcv26ZaD6lFSlgUCAh8IWp2096j_RdvQeSE6g4d1n76b5NTtAefez61oiqoMwrpkUHba1w6pU79_0KYgbGc';
        const privateVapidKey = 'rAX89dcsTsCD6mLH9QsXzyvPVRRhlUSDq7If5DJI2o8';
        const gcmAPIKey = 'AAAApZ_HZ-w:APA91bHcJu7wo56sDQMtI8IjiFUXEeSfC4kaaZT8JJcGNtMgBVYPj-83IyT3csEhy8Dsb3qDYkKtYJxIFR_Hk5_VRNLRkQzF-KvU2o0LaI6iBIJ35nU9x85XsYmzZ_sPS09Y63Twshei';
        webpush.setGCMAPIKey(gcmAPIKey);

        // Replace with your email
        webpush.setVapidDetails('mailto:sunny.vo91@gmail.com', publicVapidKey, privateVapidKey);

        const payload = JSON.stringify({
            title: `[${reallyNewItems.length}] News from F.I.T SGU`
        });

        subscriptions.forEach(sub => {
            var subscription = JSON.parse(sub.SubInfo);
            webpush.sendNotification(subscription, payload).catch(error => {
                console.error(error.stack);
            });
        });

        // and save data
        console.log(HASH);
        console.log('And save data ');
        console.log(HASH);
        var saveNewData = await new Promise(function (resolve, reject) {
            var payload = { "Fit": { "Json": JSON.stringify(newData) } };

            request.post(settings.saveUrl, { json: payload }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log('OK save to', settings.saveUrl);
                    resolve(data);

                } else {
                    console.log('ERROR', error, body);
                    res.send(`ERROR loading  ${settings.saveUrl}  ${JSON.stringify(error)}`);
                    reject(error);
                }
            });
        });

        res.send(saveNewData);
    }
});

router.get('/trigger', function (req, res) {
    const webpush = require('web-push');

    const publicVapidKey = 'BEWXhcv26ZaD6lFSlgUCAh8IWp2096j_RdvQeSE6g4d1n76b5NTtAefez61oiqoMwrpkUHba1w6pU79_0KYgbGc';
    const privateVapidKey = 'rAX89dcsTsCD6mLH9QsXzyvPVRRhlUSDq7If5DJI2o8';

    webpush.setGCMAPIKey('AAAApZ_HZ-w:APA91bHcJu7wo56sDQMtI8IjiFUXEeSfC4kaaZT8JJcGNtMgBVYPj-83IyT3csEhy8Dsb3qDYkKtYJxIFR_Hk5_VRNLRkQzF-KvU2o0LaI6iBIJ35nU9x85XsYmzZ_sPS09Y63Twshei');

    // Replace with your email
    webpush.setVapidDetails('mailto:sunny.vo91@gmail.com', publicVapidKey, privateVapidKey);

    var subscription = { "endpoint": "https://fcm.googleapis.com/fcm/send/dxTezB4JDUc:APA91bH1C7j_oe84wZjEBYxdiywXE9FPXPtMb2TUWPW62dwzrWY_4Ro8g4moLWBQwqltcuBvfSAmAJlDQhAhrPo5Hp1TgU7LwJ-7N0UXAMsVHm6jm2I7CCsX0DjX_lLO5NQtlsCblhSu", "expirationTime": null, "keys": { "p256dh": "BMSRXVSQclAdJFUaQ1aZ_1to3i8gkWkF42OqL9doPBnMR-Os9GvkYBQ2FYN2cW3YYGUjrt1PdQezNIxxb5uvLXU", "auth": "4hVvjF_blVokjEHLk5pOLg" } };

    const payload = JSON.stringify({ title: 'News from F.I.T SGU' });

    webpush.sendNotification(subscription, payload).catch(error => {
        console.error(error.stack);
    });

    res.render('index', { title: 'Express by VTS' });
});
module.exports = router;
