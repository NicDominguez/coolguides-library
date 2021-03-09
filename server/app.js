const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const GraphQLSchema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//alllow cross-orgin requests
app.use(cors());

mongoose.connect(
  "mongodb+srv://Nic_Dominguez:RFQoCsNXrJ72U8Yn@coolguideslibrary.apest.mongodb.net/CoolGuidesDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: GraphQLSchema,
    graphiql: true,
  })
);

app.listen(4000, () => console.log("now listening for requests on port 4000"));
