import React, { PropTypes } from 'react';
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';


const ListProfiles = ({ data }) => (
  <Card>
    <List>
      { data && data.map((user, index) => (
        <ListItem
          primaryText={user.first_name}
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