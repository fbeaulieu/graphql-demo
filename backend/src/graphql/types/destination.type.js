import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

const destinationType = new GraphQLObjectType({
  name: 'Destination',
  description: 'A place where individuals can travel to',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    country: { type: GraphQLString },
    rating: { type: GraphQLInt },
    contact: { type: GraphQLString }
  })
});

export default destinationType;

