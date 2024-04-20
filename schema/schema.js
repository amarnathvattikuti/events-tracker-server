const Event = require('../models/client.js');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const eventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    place: { type: GraphQLString },
    entry: { type: GraphQLString },
    date: { type: GraphQLString },
    location: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    events: {
      type: new GraphQLList(eventType),
      resolve(parent,args) {
        return Event.find() ;
      },
    },
    event: {
      type: eventType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Event.findById(args.id);
      },
    },
  },
});

//mutation
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a event
    addEvent: {
      type: eventType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        place: { type: GraphQLNonNull(GraphQLString) },
        entry: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        location: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const event = new Event({
          name: args.name,
          description: args.description,
          place: args.place,
          entry: args.entry,
          date: args.date,
          location: args.location,
        });

        return event.save();
      },
    },

    deleteEvent:{
      type: eventType,
      args:{
         id: {type: GraphQLNonNull(GraphQLID)},
      },
      resolve(parent, args){
        return Event.findByIdAndRemove(args.id);
      },
    },
  }
  });
module.exports = new GraphQLSchema({ query: RootQuery, mutation });
