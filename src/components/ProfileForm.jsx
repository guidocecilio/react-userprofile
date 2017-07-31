import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AuthService from '../modules/AuthService';
import TopicService from '../modules/TopicService';

/**
 * The rendering of selected items can be customized by providing a
 * `selectionRenderer`.
 * 
 * @class SelectTopicField
 * @extends {React.Component}
 */
class SelectTopicField extends React.Component {
  
  state = {
    values: [],
  };

  /**
   * 
   * 
   * @memberof SelectTopicField
   */
  handleChange = (event, index, values) => {
    this.setState({values});
    const newValues = this.props.topics.filter(
      (topic) => values.indexOf(topic.id) > -1
    );
    this.props.onChange(null, newValues, this.props.name);
  }

  /**
   * 
   * 
   * @memberof SelectTopicField
   */
  selectionRenderer = (values) => {
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return this.props.topics.find((d) => d.id === values[0]).name;
      default:
        return `${values.length} topics selected`;
    }
  }

  /**
   * 
   * 
   * @param {any} topics 
   * @returns 
   * @memberof SelectTopicField
   */
  menuItems(topics) {
    return topics.map((topic) => (
      <MenuItem
        key={topic.id}
        insetChildren={true}
        checked={this.state.values.indexOf(topic.id) > -1}
        value={topic.id}
        primaryText={topic.name}
      />
    ));
  }

  /**
   * 
   * 
   * @param {any} nextProps 
   * @memberof SelectTopicField
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      values: nextProps.values.map((d) => d.id)
    });
  }

  /**
   * 
   * 
   * @returns 
   * @memberof SelectTopicField
   */
  render() {
    return (
      <SelectField
        floatingLabelText="Favorite Topics"
        multiple={true}
        value={this.state.values}
        onChange={this.handleChange}
        selectionRenderer={this.selectionRenderer}
        style={{ textAlign: 'left' }}
      >
        {this.menuItems(this.props.topics)}
      </SelectField>
    );
  }
}

SelectTopicField.propTypes = {
  topics: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

/**
 * 
 * 
 * @class ProfileForm
 * @extends {React.Component}
 */
class ProfileForm extends React.Component {
  state = {
    topics: []
  };

  componentDidMount() {
    TopicService.get()
      .then((topics) => {
          this.setState({
            topics: topics
          });
        });
  }

  render() {
    return (
      <Card className="container">
        <form action="/" onSubmit={this.props.onSubmit}>
          <h2 className="card-heading">Profile Form</h2>

          {this.props.errors.summary && <p className="error-message">{this.props.errors.summary}</p>}

          <div className="field-line">
            <TextField
              floatingLabelText="First Name"
              name="first_name"
              errorText={this.props.errors.first_name}
              onChange={this.props.onChange}
              value={this.props.profile.first_name}
            />
          </div>
          <div className="field-line">
            <TextField
              floatingLabelText="Last Name"
              name="last_name"
              errorText={this.props.errors.last_name}
              onChange={this.props.onChange}
              value={this.props.profile.last_name}
            />
          </div>
          <div className="field-line">
            <TextField
              floatingLabelText="Email"
              name="email"
              errorText={this.props.errors.email}
              onChange={this.props.onChange}
              value={this.props.profile.email}
            />
          </div>
          <div className="field-line">
            <TextField
              floatingLabelText="Current Position"
              name="current_position"
              errorText={this.props.errors.current_position}
              onChange={this.props.onChange}
              value={this.props.profile.current_position}
            />
          </div>
          <div className="field-line">
            <TextField
              floatingLabelText="About You"
              name="about_you"
              multiLine={true}
              rows={2}
              errorText={this.props.errors.about_you}
              onChange={this.props.onChange}
              value={this.props.profile.about_you}
              style={{ textAlign: 'left' }}
            />
          </div>
          <div className="field-line">
            <SelectTopicField 
              name="favorite_topics"
              values={this.props.profile.favorite_topics}
              topics={this.state.topics}
              onChange={this.props.onChange}
            />
          </div>

          <div className="button-line">
            <RaisedButton type="submit" label="Update" primary />
            <RaisedButton label="Cancel" secondary
              style={{margin: 10}} href="/view-profile"/>
          </div>
        </form>
      </Card>
    );
  }
}

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

export default ProfileForm;