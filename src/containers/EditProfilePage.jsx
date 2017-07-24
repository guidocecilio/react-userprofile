import React, { PropTypes } from 'react';
import ProfileForm from '../components/ProfileForm.jsx';
import ProfileService from '../modules/ProfileService';

class EditProfilePage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      profile: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    /*
    ProfileService.update({
        this.state.profile.field,
        this.state.profile.field
      })
      .then((response) => { 
        // change the component-container state
        this.setState({
          errors: {}
        });
        // change the current URL to /
        this.context.router.replace('/user');
      })
      .catch((xhr) => {
        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.statusText;

        this.setState({
          errors
        });
      });
    */
  }

  /**
   * Change the profile object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeProfile(event) {
    const field = event.target.name;
    const profile = this.state.profile;
    profile[field] = event.target.value;
    this.setState({
      profile
    });
  }


  /**
   * Render the component.
   */
  render() {
    return (
      <ProfileForm
        onSubmit={this.processForm}
        onChange={this.changeProfile}
        errors={this.state.errors}
        profile={this.state.profile}
      />
    );
  }
}

EditProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default EditProfilePage;