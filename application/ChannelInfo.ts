import axios from 'axios';

import { twitchApiKey } from './Globals';

const SERVICES = {
  twitch: getTwitchInfoAsync
};

async function getTwitchInfoAsync(channelObj) {
  if (channelObj._icon) return;

  const url = `https://api.twitch.tv/kraken/channels/${channelObj.name}`;

  try {
    const { data: channelData } = await axios.get(url, {
      headers: { 'Client-ID': twitchApiKey }
    });

    if (!channelData.logo) return;

    const { data: logoData } = await axios.get(channelData.logo, {
      responseType: 'arraybuffer'
    });

    channelObj._icon = logoData;
  } catch (e) {}
}

export async function getInfoAsync(channelObj) {
  if (SERVICES.hasOwnProperty(channelObj.service)) {
    await SERVICES[channelObj.service](channelObj);
  }
}
