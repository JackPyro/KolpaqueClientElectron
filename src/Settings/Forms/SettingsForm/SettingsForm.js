/**
 * Created by JackP on 10/8/2017.
 */
import React from 'react'
import {Field, reduxForm} from 'redux-form'
import Toggle from 'react-toggle';
import './toggle.css';
import styled from 'styled-components'
import theme from '../../../theme';
import {withTheme} from 'styled-components'
const renderToggleInput = (field) => (
    <div>
        <Toggle checked={!!field.input.value} onChange={field.input.onChange} icons={false}/>
    </div>
);
/* { "LQ": false, "showNotifications": true, "autoPlay": false, "minimizeAtStart": false, "launchOnBalloonClick": true, "enableLog": false, "theme": "light", "width": 409, "height": 743, "youtubeApiKey": null, "twitchImport": [ "rebelvg" ] }
 */

const SettingsForm = ({handleSubmit, pristine, reset, submitting, getSettings}, initialValues) => (
    <Form initialValues={initialValues} onSubmit={handleSubmit}>
        <FieldWrapper>
            <Label>LQ</Label>
            <InputWrapper>
                <Field
                    name="LQ"
                    label="LQ"
                    component={renderToggleInput}
                    onChange={(e, v,) => {
                        getSettings(!!v, 'LQ')
                    }}
                />
            </InputWrapper>
        </FieldWrapper>
        <FieldWrapper>
            <Label>Show Notifications</Label>
            <InputWrapper>
                <Field
                    name="showNotifications"
                    component={renderToggleInput}
                    onChange={(e, v,) => {
                        getSettings(!!v, 'showNotifications')
                    }}
                />
            </InputWrapper>
        </FieldWrapper>
        <FieldWrapper>
            <Label>Minimize At Start</Label>
            <InputWrapper>
                <Field
                    name="minimizeAtStart"
                    component={renderToggleInput}
                    onChange={(e, v,) => {
                        getSettings(!!v, 'minimizeAtStart')
                    }}
                />
            </InputWrapper>
        </FieldWrapper>
        <FieldWrapper>
            <Label>Play On Balloon Click</Label>
            <InputWrapper>
                <Field
                    name="launchOnBalloonClick"
                    component={renderToggleInput}
                    onChange={(e, v,) => {
                        getSettings(!!v, 'launchOnBalloonClick')
                    }}
                />
            </InputWrapper>
        </FieldWrapper>

        <FieldWrapper full>
            <Label>Youtube Api Key</Label>
            <InputWrapper>
                <InputField
                    name="youtubeApiKey"
                    component="input"
                    type="password"
                    onBlur={(e, v,) => {
                        getSettings(v, 'youtubeApiKey', true)
                    }}
                />
            </InputWrapper>
        </FieldWrapper>

        <SaveWrapper>
            <SaveButton type="submit" disabled={pristine || submitting}>
                SAVE
            </SaveButton>
        </SaveWrapper>
    </Form>
)

const SaveWrapper = styled.div`
    position:absolute;
    bottom: 30px;
    width: 100%;
    padding: 2px 0px;
    text-align: right;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    height: 100%;
    
`

const SaveButton = styled.button`
    background-color: transparent;
    border: 2px solid ${theme.klpq};;
    margin-right: 10px;
    padding: 2px 10px;
    font-weight: bold;
    transition: all .3s;
    color: ${theme.klpq};
    &:hover {
        cursor: pointer;
        background-color: ${theme.klpq};;
        color: white
    }
`

const FieldWrapper = styled.div`
    display: flex;
    flex-direction: ${props => !!props.full ? 'column' : 'row' };
    justify-content: space-between;
    margin: 2px 20px;
`

const Label = styled.label`
    font-weight: bold;
    font-size: 15px;
`

const InputWrapper = styled.div`
   
`

const InputField = styled(Field)`
    width: 100%;
`

export default withTheme(reduxForm({
    form: 'settings' // a unique identifier for this form
})(SettingsForm))