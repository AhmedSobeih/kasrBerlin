
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewUsersList extends Component {


  render() {
    

    return (
      <div className="ViewUsersList">
       

            <div className="col-md-11">
              <Link to="/create-user" className="btn btn-outline-warning float-right">
                + Add New User
              </Link>
             
            </div>
      </div>
    );
  }
}

export default ViewUsersList;