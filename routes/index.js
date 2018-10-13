'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {

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
