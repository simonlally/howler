import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton.js";
import DeleteButton from "./DeleteButton";

export default function PostCard({
  post: { body, createdAt, id, username, likes, comments }
}) {
  const { user } = useContext(AuthContext);

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

        <Button
          compact="true"
          labelPosition="right"
          onClick={commentPost}
          as={Link}
          to={`/post/${id}`}
        >
          <Button compact="true" color="teal">
            <Icon name="comment" />
            Comment
          </Button>
          <Label basic color="teal" pointing="left">
            {comments.length}
          </Label>
        </Button>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}
