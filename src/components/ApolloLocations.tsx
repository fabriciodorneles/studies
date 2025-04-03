import { gql, useQuery } from "@apollo/client";


interface LocationData {
    description: string;
    id: string;
    name: string;
    photo: string;
}

interface LocationResponse {
    locations: LocationData[]
}

const QUERY_LOCATIONS = gql`
query GetLocations {
  locations {
    id
    name
    description
    photo
  }
}
`

export const ApolloLocations = () => {
    const { data } = useQuery<LocationResponse>(QUERY_LOCATIONS)

    if(!data) return <div>No data</div>

    return (
        <div>
            <h2>Apollo Locations</h2>
            <ul>
                {data.locations.map((item) => (
                        <li key={item.id}>
                            {item.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}