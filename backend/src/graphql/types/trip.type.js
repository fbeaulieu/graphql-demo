import db from '../../data/database';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';
import destinationType from './destination.type';
import travelerType from './traveler.type';

const dateDiffInDays = (d1, d2) => {
  var t2 = new Date(d2).getTime();
  var t1 = new Date(d1).getTime();
  return parseInt((t2 - t1) / (24 * 3600 * 1000));
};

const tripType = new GraphQLObjectType({
  name: 'Trip',
  description: 'A trip made by a traveler to a specific destination',
  fields: () => ({
    id: { type: GraphQLID },
    destination: {
      type: destinationType,
      resolve(parent, args) {
        let dest = db.data.destinations.find(dest => dest.id === parent.destination);
        return dest;
      }
    },
    beginDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    duration: {
      type: GraphQLInt,
      resolve(parent, args) {
        return dateDiffInDays(parent.beginDate, parent.endDate);
      }
    },
    rating: { type: GraphQLInt },
    traveler: {
      type: travelerType,
      resolve(parent, args) {
        let trip = db.data.travelers.find(traveler => traveler.id === parent.traveler);
        return trip;
      }
    }
  })
});

export default tripType;

