const graphql = require("graphql");
const Guide = require("../models/guide");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLDate,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const GuideType = new GraphQLObjectType({
  name: "Guide",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    postDate: { type: GraphQLString },
    author: { type: GraphQLString },
    tags: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    guide: {
      type: GuideType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Guide.findById(args.id);
      },
    },
    guides: {
      type: new GraphQLList(GuideType),
      resolve(parent, args) {
        return Guide.find({});
      },
    },
    // need to do a guides query based on tag name
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addGuide: {
      type: GuideType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        imageURL: { type: new GraphQLNonNull(GraphQLString) },
        postDate: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) },
        tags: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let guide = new Guide({
          title: args.title,
          imageURL: args.imageURL,
          postDate: args.postDate,
          author: args.author,
          tags: args.tags,
        });
        return guide.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
