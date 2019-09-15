import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../context/auth";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

import {
  Grid,
  Card,
  Button,
  Icon,
  Label,
  Form,
  TextArea
} from "semantic-ui-react";

export default function SinglePost(props) {
  // get the postID from the URL
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const {
    data: { getPost }
  } = useQuery(SINGLE_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment("");
    },
    variables: {
      postId,
      body: comment
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
      <Grid centered>
        <Grid.Row>
          <Grid.Column centered width={12}>
            <Card fluid style={{ border: "2px solid" }}>
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
                  <DeleteButton postId={id} callback={deletePostCallBack} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a new comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <TextArea
                        rows={2}
                        type="text"
                        placeholder="new comment..."
                        name="comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="ui button"
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map(com => (
              <Card fluid key={com.id}>
                <Card.Content>
                  <Card.Header>{com.username}</Card.Header>
                  <Card.Meta>{moment(com.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{com.body}</Card.Description>
                  {user && user.username === com.username && (
                    <DeleteButton postId={id} commentId={com.id} />
                  )}
                </Card.Content>
              </Card>
            ))}
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

const CREATE_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        createdAt
        username
        body
      }
    }
  }
`;
