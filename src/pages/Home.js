import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import Spinner from "../components/Spinner";
import { GET_POSTS_QUERY } from "../util/graphql";

export default function Home() {
  const { user } = useContext(AuthContext);

  const {
    loading,
    data: { getPosts: posts }
  } = useQuery(GET_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Welcome to Howler!</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <Spinner />
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
