import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";

export default function DeleteButton({ postId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST, {
    update() {
      // are you sure you want to delete this post?
      setConfirmOpen(false);
      // still need to remove post from cache
    },
    variables: {
      postId
    }
  });

  return (
    <>
      <Button as="div" color="red" onClick={() => console.log("delete post")}>
        <Icon name="trash" />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
}

const DELETE_POST = gql`
    mutation deletePost($postId: ID!) {
        deletePost($postId: postId)
    }
`;
