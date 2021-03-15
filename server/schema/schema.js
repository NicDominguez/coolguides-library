const graphql = require("graphql");
const Guide = require("../models/guide");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
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
    tags: { type: GraphQLList(GraphQLString) },
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
    allGuides: {
      type: new GraphQLList(GuideType),
      resolve(parent, args) {
        return Guide.find({});
      },
    },
    guidesByTag: {
      type: new GraphQLList(GuideType),
      args: {
        tagsQuery: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Guide.find({ tags: { $in: args.tagsQuery } });
      },
    },
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
        tags: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
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
    updateGuide: {
      type: GuideType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        imageURL: { type: new GraphQLNonNull(GraphQLString) },
        postDate: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) },
        tags: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
      },
      resolve(parent, args) {
        return Guide.findByIdAndUpdate(
          args.id,
          {
            title: args.title,
            imageURL: args.imageURL,
            postDate: args.postDate,
            author: args.author,
            tags: args.tags,
          },
          {
            new: true,
          }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
