import db from '../../data/database';
import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';
import tripType from './trip.type';

const travelerType = new GraphQLObjectType({
  name: 'Traveler',
  description: 'A person who travel',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    country: { type: GraphQLString },
    city: { type: GraphQLString },
    age: { type: GraphQLInt },
    email: { type: GraphQLString },
    trips: {
      type: new GraphQLList(tripType),
      args: { limit: { type: GraphQLInt } },
      resolve(parent, args) {
        let trips = db.data.trips.filter(trip => trip.traveler === parent.id);
        if (args.limit && args.limit >= 0) {
          return trips.slice(0, args.limit);
        }
        return trips;
      }
    }
  })
});

export default travelerType;

