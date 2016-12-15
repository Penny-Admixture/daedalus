// @flow
import React, { Component, PropTypes } from 'react';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import Settings from '../../components/settings/Settings';
import ProfileSettings from '../../components/settings/categories/ProfileSettings';

@observer(['state', 'controller'])
export default class ProfileSettingsPage extends Component {

  static propTypes = {
    state: PropTypes.shape({
      settings: PropTypes.shape({
        profile: MobxPropTypes.observableObject.isRequired
      }).isRequired,
      login: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired
      }).isRequired
    }).isRequired,
    controller: PropTypes.shape({
      user: PropTypes.shape({
        updateField: PropTypes.func.isRequired
      }).isRequired
    }).isRequired
  };

  render() {
    const { profile } = this.props.state.settings;
    const { isLoading } = this.props.state.login;
    const { controller } = this.props;
    if (isLoading) return <div>Loading</div>;
    return (
      <Settings>
        <ProfileSettings
          profile={profile}
          onFieldValueChange={(field, name) => controller.user.updateField(field, name)}
        />
      </Settings>
    );
  }

}
