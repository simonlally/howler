import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

export default function Home() {
  const { user } = useContext(AuthContext);

  const {
    loading,
    data: { getPosts: posts }
  } = useQuery(GET_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
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
