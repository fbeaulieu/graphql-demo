import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import { queryData } from '../helpers/query-helper';

const queryTravelers = `query {
    travelers {
      id
      firstName
      lastName
      country
      city
      age
      email
    }
  }
`;

const TravelerList = (props) => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const refreshData = async () => {
    try {
      setLoading(true);
      let response = await queryData(queryTravelers);
      setData(response.data.travelers);
    }
    catch (e) {
      console.log('error occured!', e);
    }
    finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    refreshData();
  }, []);

  const renderTravelers = (travelers) => {
    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Country</th>
            <th>City</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {travelers.map(traveler =>
            <tr key={traveler.id}>
              <td>{traveler.id}</td>
              <td>{traveler.firstName}</td>
              <td>{traveler.lastName}</td>
              <td>{traveler.country}</td>
              <td>{traveler.city}</td>
              <td>{traveler.age}</td>
              <td>{traveler.email}</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }

  return (
    <div>
      <div className="header">
        <span className="title">List of Travelers</span>
        <br></br>
        <br></br>
      </div>

      <div className="data">
        {isLoading
          ? <p>Loading Data...</p>
          : renderTravelers(data)}
      </div>

      <br />
      <Button color="info" className="header-action" onClick={refreshData}>Refresh Data</Button>

    </div >
  );
};

export default TravelerList;