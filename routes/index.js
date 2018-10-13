'use strict';
var express = require('express');
var fs = require('fs');
var querystring = require('querystring');
var http = require('http');
var request = require('request');
var loader = require('../code/loader');
var settings = require('../code/settings');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express by VTS' });
});

router.get('/ATriggerVerify.txt', function (req, res) {
    var source = fs.readFileSync('public/ATriggerVerify.txt', 'utf8');
    res.send(source);
});

router.get('/send_data_to_php', async function (req, res) {

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


    var latest = await new Promise(function (resolve, reject) {

        request.get(settings.getUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {

                console.log('OK get from', settings.getUrl);
                resolve();
            } else {
                console.log('ERROR get from', settings.getUrl);

                reject(error);
            }
        });
    });

    request.get(settings.fitUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('OK loaded', settings.fitUrl);
            var list = loader.parseHtml(body);
            var data = { List: list, Date: new Date() };

            var payload = { "Fit": { "Json": JSON.stringify(data) } };

            request.post(settings.saveUrl, { json: payload }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    
                    console.log('OK save to', settings.saveUrl);
                    res.send(data);

                } else {
                    console.log('ERROR', error, body);

                    res.send(`ERROR loading  ${settings.saveUrl}  ${JSON.stringify(error)}`);

                }
            });
        } else {
            console.log('ERROR', error, body)
            res.send(`ERROR loading  ${settings.fitUrl}  ${JSON.stringify(error)}`);
        }
    });
});

router.get('/trigger', function (req, res) {

    const webpush = require('web-push');

    const publicVapidKey = 'BEWXhcv26ZaD6lFSlgUCAh8IWp2096j_RdvQeSE6g4d1n76b5NTtAefez61oiqoMwrpkUHba1w6pU79_0KYgbGc';
    const privateVapidKey = 'rAX89dcsTsCD6mLH9QsXzyvPVRRhlUSDq7If5DJI2o8';

    webpush.setGCMAPIKey('AAAApZ_HZ-w:APA91bHcJu7wo56sDQMtI8IjiFUXEeSfC4kaaZT8JJcGNtMgBVYPj-83IyT3csEhy8Dsb3qDYkKtYJxIFR_Hk5_VRNLRkQzF-KvU2o0LaI6iBIJ35nU9x85XsYmzZ_sPS09Y63Twshei');

    // Replace with your email
    webpush.setVapidDetails('mailto:sunny.vo91@gmail.com', publicVapidKey, privateVapidKey);

    //const subscription = JSON.parse("{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/dxTezB4JDUc:APA91bH1C7j_oe84wZjEBYxdiywXE9FPXPtMb2TUWPW62dwzrWY_4Ro8g4moLWBQwqltcuBvfSAmAJlDQhAhrPo5Hp1TgU7LwJ-7N0UXAMsVHm6jm2I7CCsX0DjX_lLO5NQtlsCblhSu\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BMSRXVSQclAdJFUaQ1aZ_1to3i8gkWkF42OqL9doPBnMR-Os9GvkYBQ2FYN2cW3YYGUjrt1PdQezNIxxb5uvLXU\",\"auth\":\"4hVvjF_blVokjEHLk5pOLg\"}}");

    //const subscription = JSON.parse("{\"endpoint\":\"https://fcm.googleapis.com/fcm/send/dtjw3OINFe8:APA91bFrOrGWd18KaesduRw_m1_GFuJvU22FlpK6acsZWyuCfhhvnhYohKPC8GhtWI72GPnxbgugMx6s74CapmfqaV2AWkcVJw3v0UoFehNx6oFiabiu0UkE2MRqObR1sz3KO-96nG_F\",\"expirationTime\":null,\"keys\":{\"p256dh\":\"BLecJ-yxa3FQVbaQAgvDEIfNfpE44au9e0jgeCIgx0k2EtjL2Qopfx4RLhElvpMOINpCKf11qmfkgDyc-jOX1RU\",\"auth\":\"C-0dQEgAYc2tPdW3Y3o-MA\"}}");

    var subscription = { "endpoint": "https://fcm.googleapis.com/fcm/send/eRVpPUvMEuw:APA91bFsMvAn0K56QJhXksJ9AQPdo5iy_SEGAfABcZx7jLXJOMSlemU50xoQec169wVZmgNmLmeuF6QCgfCogkt9JXhrVGR9f2dmL5mVbSZtgT8DXQB9_2OK4TSM6EOUCIz0GUGwASpq", "expirationTime": null, "keys": { "p256dh": "BGm1HT1wvIHU50Bpdzz9arGqLXBwD2akHukffpMxduzZOHHGCjCbSTcYHYd7bShiZqRqlKWQul3UVG8fAsf7h2g", "auth": "dm3dmbVy9rp8a0MxoQuTIg" } };

    subscription = { "endpoint": "https://fcm.googleapis.com/fcm/send/f23P8qYiuBk:APA91bFS7Lj7bNVuV0gEu546fESXGNoVltE176eytX4XVjlp3lkizDPd_F4Ajjr5NMoSF3EF7bQuBtbD6tCUuLn8l51EpfBDQ8SGIkN1lJgdM7q46w_qL5ANkgFQYgPCY-1Liypbz4ra", "expirationTime": null, "keys": { "p256dh": "BD18RlT2JDHZJ5U66o1eoDWqNW4vEMdEc9Ow4D7y--_Vx3SzsY4m8D0neTkt-wXcOTZ64hjECOrQwNNLRPQbwb8", "auth": "dMUnxA7nhrTABAV8S_E_bA" } };

    //subscription = { "endpoint": "https://fcm.googleapis.com/fcm/send/dxTezB4JDUc:APA91bH1C7j_oe84wZjEBYxdiywXE9FPXPtMb2TUWPW62dwzrWY_4Ro8g4moLWBQwqltcuBvfSAmAJlDQhAhrPo5Hp1TgU7LwJ-7N0UXAMsVHm6jm2I7CCsX0DjX_lLO5NQtlsCblhSu", "expirationTime": null, "keys": { "p256dh": "BMSRXVSQclAdJFUaQ1aZ_1to3i8gkWkF42OqL9doPBnMR-Os9GvkYBQ2FYN2cW3YYGUjrt1PdQezNIxxb5uvLXU", "auth": "4hVvjF_blVokjEHLk5pOLg" } };

    subscription = { "endpoint": "https://fcm.googleapis.com/fcm/send/dxTezB4JDUc:APA91bH1C7j_oe84wZjEBYxdiywXE9FPXPtMb2TUWPW62dwzrWY_4Ro8g4moLWBQwqltcuBvfSAmAJlDQhAhrPo5Hp1TgU7LwJ-7N0UXAMsVHm6jm2I7CCsX0DjX_lLO5NQtlsCblhSu", "expirationTime": null, "keys": { "p256dh": "BMSRXVSQclAdJFUaQ1aZ_1to3i8gkWkF42OqL9doPBnMR-Os9GvkYBQ2FYN2cW3YYGUjrt1PdQezNIxxb5uvLXU", "auth": "4hVvjF_blVokjEHLk5pOLg" } };

    const payload = JSON.stringify({ title: 'News from F.I.T SGU' });

    webpush.sendNotification(subscription, payload).catch(error => {
        console.error(error.stack);
    });

    res.render('index', { title: 'Express by VTS' });
});
module.exports = router;
