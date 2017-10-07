/**
 * Created by rebel on 27/03/2017.
 */

const {app, shell, Menu} = require('electron');
const path = require('path');
const request = require('request');
const notifier = require('node-notifier');

const SettingsFile = require('./SettingsFile');
const ChannelPlay = require('./ChannelPlay');
const ChannelCheck = require('./ChannelCheck');

function printNotification(title, content) {
    let settingsJson = SettingsFile.settingsJson;

    if (!settingsJson.settings.showNotifications)
        return;

    app.appIcon.title = title;
    app.appIcon.content = content;

    if (process.platform === 'win32') {
        printNotificationWin(title, content);
    } else {
        printNotificationMac(title, content);
    }
}

function printNotificationWin(title, content) {
    app.appIcon.displayBalloon({
        icon: app.appIcon.iconPathBalloon,
        title: title,
        content: content
    });
}

function printNotificationMac(title, content) {
    notifier.notify({
        icon: app.appIcon.iconPathBalloon,
        title: title,
        message: content,
        sound: false,
        wait: true
    }, function (err, response) {
        if (response === 'activate')
            onBalloonClick(title, content);
    });
}

function onBalloonClick(title, content) {
    let settingsJson = SettingsFile.settingsJson;

    console.log('balloon was clicked.');

    if (!settingsJson.settings.launchOnBalloonClick)
        return;

    if (title.indexOf('Stream is Live') === 0) {
        ChannelPlay.launchPlayerLink(content);
    }

    if (title.indexOf('Client Update Available') === 0) {
        shell.openExternal(content);
    }

    if (title.indexOf('Streamlink Update Available') === 0) {
        shell.openExternal(content);
    }
}

function rebuildIconMenu() {
    let onlineChannels = Object.keys(ChannelCheck.onlineChannels);

    app.contextMenuTemplate[1].submenu = onlineChannels.map(function (channelLink) {
        return {
            label: channelLink, type: 'normal', click: (menuItem) => {
                ChannelPlay.launchPlayerLink(menuItem.label);
            }
        }
    });

    let contextMenu = Menu.buildFromTemplate(app.contextMenuTemplate);

    app.appIcon.setContextMenu(contextMenu);
}

exports.printNotification = printNotification;
exports.onBalloonClick = onBalloonClick;
exports.rebuildIconMenu = rebuildIconMenu;
