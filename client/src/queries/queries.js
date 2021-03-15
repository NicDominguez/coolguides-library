import { gql } from "@apollo/client";

const getAllGuidesQuery = gql`
  {
    allGuides {
      id
      title
      imageURL
      postDate
      author
      tags
    }
  }
`;

const getGuideQuery = gql`
  query($id: ID) {
    guide(id: $id) {
      id
      title
      imageURL
      postDate
      author
      tags
    }
  }
`;

const getGuidesByTagQuery = gql`
  query($tagsQuery: String) {
    guide(tagsQuery: $tagsQuery) {
      id
      title
      imageURL
      postDate
      author
      tags
    }
  }
`;

const addGuideMutation = gql`
  mutation addGuide(
    $title: String!
    $imageURL: String!
    $postDate: String!
    $author: String!
    $tags: [String]!
  ) {
    addGuide(
      title: $title
      imageURL: $imageURL
      postDate: $postDate
      author: $author
      tags: $tags
    ) {
      id
      title
      imageURL
      postDate
      author
      tags
    }
  }
`;

const updateGuideMutation = gql`
  mutation updateGuide(
    $title: String!
    $imageURL: String!
    $postDate: String!
    $author: String!
    $tags: [String]!
  ) {
    updateGuide(
      title: $title
      imageURL: $imageURL
      postDate: $postDate
      author: $author
      tags: $tags
    ) {
      id
      title
      imageURL
      postDate
      author
      tags
    }
  }
`;

export {
  getAllGuidesQuery,
  getGuideQuery,
  getGuidesByTagQuery,
  addGuideMutation,
  updateGuideMutation,
};
