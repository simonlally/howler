import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Image } from "semantic-ui-react";

import PostCard from "../components/PostCard";

export default function Home() {
  const {
    loading,
    data: { getPosts: posts },
    error
  } = useQuery(GET_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          posts &&
          posts.map(post => (
            <Grid.Column key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const GET_POSTS_QUERY = gql`
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
