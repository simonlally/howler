import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";

import { GET_POSTS_QUERY } from "../util/graphql";

export default function DeleteButton({ postId, commentId, callback }) {
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

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    update(proxy) {
      setConfirmOpen(false);

      const data = proxy.readQuery({
        query: GET_POSTS_QUERY
      });

      data.getPosts = data.getPosts.filter(p => p.id !== postId);
      proxy.writeQuery({ query: GET_POSTS_QUERY, data });

      if (callback) callback();
    },
    variables: {
      postId,
      commentId
    }
  });

  return (
    <>
      <Button size="small" basic color="red" onClick={() => setConfirmOpen(true)}>
        <Icon fitted name="x" />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={commentId ? deleteComment : deletePost}
      />
    </>
  );
}

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        body
        createdAt
      }
    }
  }
`;
