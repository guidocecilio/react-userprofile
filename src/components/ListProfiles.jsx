import React, { PropTypes } from 'react';
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';


const ListProfiles = ({ data }) => (
  <Card className="container">
    <List>
      { data && data.map((user, index) => (
        <ListItem style={{ textAlign: 'left'}}
          primaryText={user.first_name + ' ' + user.last_name}
          secondaryText={user.username}
        />
      ))
      }
    </List>
  </Card>
);

ListProfiles.propTypes = {
  data: PropTypes.array.isRequired
};

export default ListProfiles;