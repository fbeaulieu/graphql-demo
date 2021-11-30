// Import External Dependancies
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import { v4 as uuid } from 'uuid';
import db from '../data/database';
import types from './types';

const id = () => {
  return uuid();
};

// Define root queries
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    traveler: {
      type: types.travelerType,
      description: 'Retrieve a specific traveler',
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const item = db.data.travelers.find(rec => rec.id == args.id);
        return item;
      }
    },
    travelers: {
      type: new GraphQLList(types.travelerType),
      description: 'Retrieve the list of all travelers',
      resolve(parent, args) {
        return db.data.travelers;
      }
    },
    trip: {
      type: types.tripType,
      description: 'Retrieve a specific trip taken by a traveler',
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const item = db.data.trips.find(rec => rec.id == args.id);
      }
    },
    trips: {
      type: new GraphQLList(types.tripType),
      description: 'Retrieve the list of all trips taken by all travelers',
      args: { limit: { type: GraphQLInt } },
      resolve(parent, args) {
        if (args.limit && args.limit >= 0) {
          return db.data.trips.slice(0, args.limit);
        }
        return db.data.trips;
      }
    },
    destination: {
      type: types.destinationType,
      description: 'Retrieve a specific destination',
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const item = db.data.destinations.find(rec => rec.id == args.id);
      }
    },
    destinations: {
      type: new GraphQLList(types.destinationType),
      description: 'Retrieve the list of all destinations',
      resolve(parent, args) {
        return db.data.destinations;
      }
    }
  })
})

// Define Mutations
const RootMutations = new GraphQLObjectType({
  name: 'RootMutations',
  fields: () => ({
    travel: {
      type: types.tripType,
      description: 'Allow to add a new trip for a specific Traveler',
      args: {
        destination: { type: new GraphQLNonNull(GraphQLString) },
        beginDate: { type: new GraphQLNonNull(GraphQLString) },
        endDate: { type: new GraphQLNonNull(GraphQLString) },
        rating: { type: new GraphQLNonNull(GraphQLInt) },
        traveler: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        let trip = { ...args, id: id() };
        db.data.trips.push(trip);
        await db.write()
        return trip;
      }
    },
  })
});

const schemas = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutations
});

// Export the schema
export default schemas;