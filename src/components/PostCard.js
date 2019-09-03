import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton.js";

export default function PostCard({
  post: { body, createdAt, id, username, likes, comments }
}) {
  const { user } = useContext(AuthContext);
  function likePost() {
    console.log("post liked!");
  }

  function commentPost() {
    console.log("post commented!");
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes }} />
        <Label as="a" basic color="blue" pointing="left">
          {likes.length}
        </Label>

        <Button
          as="div"
          labelPosition="right"
          onClick={commentPost}
          as={Link}
          to={`/post/${id}`}
        >
          <Button color="green">
            <Icon name="comment" />
            Comment
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {comments.length}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button
            as="div"
            color="red"
            onClick={() => console.log("delete post")}
          >
            <Icon name="trash" />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}
