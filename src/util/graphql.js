import gql from "graphql-tag";

export const GET_POSTS_QUERY = gql`
  {
    getPosts {
      id
      username
      body
      createdAt
      likes {
        username
      }
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;
