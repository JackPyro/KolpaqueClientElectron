const {ipcRenderer} = window.require('electron');

export const GET_SETTINGS = 'GET_SETTINGS';
export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';

export function initSettings() {
    let data = ipcRenderer.sendSync('getSettings');

    return {
        type: GET_SETTINGS,
        data: data
    };
}

export function changeSettings(settingName, settingValue) {
    ipcRenderer.send('config_changeSetting', settingValue, settingName)
    return {
        type: CHANGE_SETTINGS,
        settingName,
        settingValue
    };
}
