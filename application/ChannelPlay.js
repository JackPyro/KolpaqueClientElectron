/**
 * Created by rebel on 22/03/2017.
 */

const {ipcMain, dialog} = require('electron');
const fs = require('fs');
const SettingsFile = require('./SettingsFile');
const Notifications = require('./Notifications');

ipcMain.on('channel-play', (event, channel) => {
    launchPlayerLink(channel.link, channel.LQ);
});

function launchPlayer(channelObj, LQ = null) {
    let channelLink = channelObj.link;

    launchPlayerLink(channelLink, LQ);
}

function launchPlayerLink(channelLink, LQ = null) {
    let channelObj = SettingsFile.buildChannelObj(channelLink);

    if (channelObj === false) {
        return false;
    }

    let settingsJson = SettingsFile.returnSettings();

    let quality = 'best';

    if (LQ === null) {
        LQ = settingsJson.settings.LQ;
    }

    if (channelObj.protocol === 'rtmp:') {
        channelLink += " live=1";

        if (LQ && channelObj.service === 'klpq-main') {
            channelLink = channelLink.replace('/live/', '/restream/');
        }
    } else {
        if (LQ) {
            quality = '720p,high,480p,medium,360p';
        }
    }

    let path = settingsJson.settings.livestreamerPath;

    if (fs.existsSync(path)) {
        let child = require('child_process').execFile;

        console.log('launching player for ' + channelLink);

        child(path, [channelLink, quality], function (err, data, stderr) {
            //console.log(err);
            console.log(data);
            //console.log(stderr);
            console.log('player was closed.');

            if (data.indexOf('error: ') >= 0) {
                let error = data.split('error: ');

                Notifications.printNotification('Error', error[1]);
            }
        });
    } else {
        dialog.showMessageBox({
            type: 'error',
            message: path + ' not found.'
        });
    }
}

exports.launchPlayer = launchPlayer;
exports.launchPlayerLink = launchPlayerLink;
