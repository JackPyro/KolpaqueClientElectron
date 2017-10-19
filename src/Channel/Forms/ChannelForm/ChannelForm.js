import React, {Component} from 'react';
import Ionicon from 'react-ionicons'
import styled from 'styled-components'
import {Field, reduxForm} from 'redux-form'
import theme from '../../../theme'


const {remote} = window.require('electron');
const {Menu} = remote;


let template = [
    {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
    },
    {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
    },
    {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
    },
    {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
    }
];

const openMenu = () => {
    var macMenu = Menu.buildFromTemplate(template);
    macMenu.popup(remote.getCurrentWindow());
}

export default class ChannelForm extends Component {
    constructor(props) {
        super()
        this.state = {
            value: ''
        }
    }

    onChange = (e) => {
        this.setState({value: e.target.value})
    }


    handleSubmit = (e) => {
        const {value} = this.state;
        console.log(value);
        this.setState({
            value: ''
        })
        this.props.addChannel(value);
        e.preventDefault();
    }

    render() {
        const {value} = this.state;
        return (

            <form onSubmit={ this.handleSubmit }>
                <StyledChannelFormWrap>
                    <StyledInput onContextMenu={() => openMenu()}
                                 component="input" name="channel"
                                 onChange={this.onChange}
                                 value={value}
                                 placeholder="Add Channel"
                                 type="text"/>
                    <button type="submit">
                        <StyledIcon fontSize="24px" color={theme.addChannelBtn.color} icon="ion-plus"/>
                    </button>
                </StyledChannelFormWrap>
            </form>
        )
    }
}


const StyledChannelFormWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 2px;
    & button {
        -webkit-appearance: none;
        border:none;
        padding: 0;
        margin: 0;
        cursor: pointer
    }
`;

const StyledInput = styled.input`
    flex-grow:2;
    width: 100%;
    display: flex;
    background-color: #fff;
    background-image: none;
    background-clip: padding-box;
    height: 24px;
    border: none;
    border-top: 1px solid lightgray;
    box-shadow: none;
    box-sizing: border-box;
    font-size: 14px;
    padding-left: 10px;
`;

const StyledIcon = styled(Ionicon)`
  background-color:${theme.addChannelBtn.bg};
  color:white;
  display: flex;
  box-sizing: border-box;
  border: 1px solid lightgray;
  font-size:24px;
`;