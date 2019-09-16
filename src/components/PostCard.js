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

  return (
    <Card fluid>
      <Card.Content style={{ height: "120px" }}>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description style={{ overflow: "auto", height: "60px" }}>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes }} />

        <Button size="small" labelPosition="right" as={Link} to={`/post/${id}`}>
          <Button size="small" color="teal">
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
