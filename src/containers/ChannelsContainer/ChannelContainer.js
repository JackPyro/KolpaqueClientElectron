import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Ionicon from 'react-ionicons'
import {Link} from 'react-router-dom';
import styled from 'styled-components';
const {ipcRenderer} = window.require('electron');
import {initChannels, changeStatus} from '../../redux/actions/channels'
import {getOffline, getOnline} from '../../redux/reducers/channels'
import './style.css';
import ChannelWrapper from '../../components/Channels/ChannelWrapper/ChannelWrapper'
import Channel from '../../components/Channels/Channel/Channel'
import ChannelForm from '../../components/Channels/ChannelForm/ChannelForm'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

export class ChannelContainer extends Component {
    constructor() {
        super()
    }

    componentWillMount() {
        this.props.initChannels()
    }

    componentDidMount() {
        ipcRenderer.on('channel-went-online', (event, channel) => this.props.changeStatus(channel.link));
    }

    render() {
        const {online, offline} = this.props;

        return (
            <StyledContainerWrapper>
                <Tabs>
                    <TabList className="tabs">
                        <Tab className='tab' selectedClassName="active">Online ({online.length})</Tab>
                        <Tab className='tab' selectedClassName="active">Offline ({offline.length})</Tab>
                    </TabList>
                    <Channel pinned={true} channel={{name: 'Nozlar One Love'}}/>
                    <TabPanel className='tab-panel'>
                        <ChannelWrapper channels={online}/>
                    </TabPanel>
                    <TabPanel className='tab-panel'>
                        <ChannelWrapper channels={offline}/>
                    </TabPanel>
                </Tabs>

                <StyledFooter className="fixed-bottom">
                    <ChannelForm/>
                    <SettingsIcon to="/about"><Ionicon icon="ion-ios-cog" color="white"/></SettingsIcon>
                </StyledFooter>
            </StyledContainerWrapper>
        );
    }
}
const StyledFooter = styled.div`
    background-color: #262626;
    color: white;
`;
const SettingsIcon = styled(Link)`
    display: flex;
    padding: 2px;
`;
const StyledContainerWrapper = styled.div`
  
`

const StyledChannel = styled(Channel)`
background-color: yellow
color: white;
`

export default connect(
    (state) => ({
        online: getOnline(state),
        offline: getOffline(state)
    }),
    (dispatch) => bindActionCreators({
        initChannels,
        changeStatus,
    }, dispatch)
)(ChannelContainer);
