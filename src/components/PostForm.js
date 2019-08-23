import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export default function PostForm(props) {
  const [values, setValues] = useState({
    body: ""
  });

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log("okokokok");
    createPost();
  };

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(_, result) {
      console.log(result);
      values.body = "";
    }
  });

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="hello!"
          name="body"
          onChange={onChange}
          value={values.body}
        />
        <Button type="submit">submit</Button>
      </Form.Field>
    </Form>
  );
}

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;
