import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import { AuthContext } from "../context/auth";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

import { Grid, Card, Button, Icon, Label } from "semantic-ui-react";

export default function SinglePost(props) {
  // get the postID from the URL
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  console.log(postId);

  const {
    data: { getPost }
  } = useQuery(SINGLE_POST_QUERY, {
    variables: {
      postId
    }
  });

  function deletePostCallBack() {
    props.history.push("/");
  }

  let postMarkup;

  if (!getPost) {
    postMarkup = <p>Loading...</p>;
  } else {
    const { id, body, username, createdAt, comments, likes } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("commented!")}
                >
                  <Button basic color="green">
                    <Icon name="comment" />
                  </Button>
                  <Label basic color="green" pointing="left">
                    {comments.length}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return postMarkup;
}

const SINGLE_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
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
