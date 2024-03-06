/*** SCHEMA ***/
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const john = (key) => ({
  id: key,
  name: "John Smith",
});

const peopleData = [...Array(50000).keys()].map((key) => ({
  id: key.toString(),
  name: "John Smith",
}));

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    people: {
      type: new GraphQLList(PersonType),
      resolve: () => peopleData,
    },
    onePerson: {
      type: PersonType,
      resolve: () => john("3"),
    },
  },
});

export const schema = new GraphQLSchema({
  query: QueryType,
});
