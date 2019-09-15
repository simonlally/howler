import React, { useState, useContext } from "react";
import { Form, Button, Grid, Card, Header } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import Logo from "../components/Logo";
import howler_img from "../assets/IMG_0110.PNG";

export default function Login(props) {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    loginUser();
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  return (
    <>
      <Grid centered columns={1}>
        <Grid.Row>
          <Logo imgSource={howler_img} />
        </Grid.Row>
        <Grid.Row>
          <Card>
            <Card.Content textAlign="left">
              <Form
                onSubmit={onSubmit}
                noValidate
                className={loading ? "loading" : ""}
              >
                <Header as="h1" textAlign="center">
                  Login
                </Header>
                <Form.Input
                  label="Username"
                  placeholder="Username..."
                  name="username"
                  value={values.username}
                  onChange={onChange}
                />
                <Form.Input
                  label="Password"
                  placeholder="Password..."
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={onChange}
                />
                <Button type="submit" primary>
                  Login
                </Button>
              </Form>
              {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                  <ul className="list">
                    {Object.values(errors).map(value => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card.Content>
          </Card>
        </Grid.Row>
      </Grid>
    </>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
