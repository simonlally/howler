import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";

import { GET_POSTS_QUERY } from "../util/graphql";

export default function DeleteButton({ postId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST, {
    update(proxy) {
      // are you sure you want to delete this post?
      setConfirmOpen(false);

      const data = proxy.readQuery({
        query: GET_POSTS_QUERY
      });

      data.getPosts = data.getPosts.filter(p => p.id !== postId);
      proxy.writeQuery({ query: GET_POSTS_QUERY, data });

      if (callback) {
        callback();
      }
    },
    variables: {
      postId
    }
  });

  return (
    <>
      <Button as="div" color="red" onClick={() => setConfirmOpen(true)}>
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
    deletePost(postId: $postId)
  }
`;
