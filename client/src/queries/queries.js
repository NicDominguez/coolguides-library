import { gql } from "@apollo/client";

const getAllGuidesQuery = gql`
  {
    guides {
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
  }
`;

const addGuideMutation = gql`
  mutation(
    $title: String!
    $imageURL: String!
    $postDate: String!
    $author: String!
    $tags: String!
  ) {
    addGuide(
      name: $title
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

const udpateGuideMutation = gql`
  mutation(
    $title: String!
    $imageURL: String!
    $postDate: String!
    $author: String!
    $tags: String!
  ) {
    updateGuide(
      name: $title
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
  addGuideMutation,
  getGuideQuery,
  getGuidesByTagQuery,
  udpateGuideMutation,
};
