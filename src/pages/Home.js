import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Header } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

import Logo from "../components/Logo";
import howler_img from "../assets/IMG_0110.PNG";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import Spinner from "../components/Spinner";
import { GET_POSTS_QUERY } from "../util/graphql";

export default function Home() {
  const { user } = useContext(AuthContext);

  const [sorted, setSorted] = useState(false);

  const {
    loading,
    data: { getPosts: posts }
  } = useQuery(GET_POSTS_QUERY);

  if (posts && !sorted) {
    posts.reverse();
    setSorted(true);
  }

  return (
    <Grid columns={3}>
      <Grid.Row centered>
        <Logo imgSource={howler_img} />
      </Grid.Row>
      <Grid.Row centered>
        <Header as="h1" textAlign="center">
          Welcome to Howler!
        </Header>
      </Grid.Row>
      <Grid.Row centered>
        {user && (
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <PostForm />
          </Grid.Column>
        )}
      </Grid.Row>
      <Grid.Row centered>
        <h4>Check out the latest howls!</h4>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <Spinner />
        ) : (
          posts &&
          posts.map(post => (
            <Grid.Column key={post.id} mobile={16} tablet={8} computer={5}>
              <div className="card div" style={{ marginBottom: "20px" }}>
                <PostCard post={post} />
              </div>
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}
