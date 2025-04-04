/* eslint-disable @typescript-eslint/no-explicit-any */
// src/Launches.js
import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { useState } from 'react';
import './ApolloSpaceXList.css'

const GET_LAUNCHES = gql`
  query GetLaunches($limit: Int!, $offset: Int!) {
    launches(limit: $limit, offset: $offset) {
      id
      mission_name
      launch_date_utc
      rocket {
        rocket_name
      }
    }
  }
`;

const Launches = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { loading, error, data } = useQuery(GET_LAUNCHES, {
    variables: {
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>SpaceX Launches</h1>
      <ul className='spaceXul'>
        {data.launches.map((launch:any) => (
          <li key={launch.id} className='spaceXli'>
            <h3>{launch.mission_name}</h3>
            <p>Date: {new Date(launch.launch_date_utc).toLocaleDateString()}</p>
            <p>Rocket: {launch.rocket.rocket_name}</p>
          </li>
        ))}
      </ul>

      {/* Controles de Paginação */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={data.launches.length < itemsPerPage}
          className='spaceXbutton'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Launches;