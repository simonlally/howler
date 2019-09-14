import React from "react";
import { Loader } from "semantic-ui-react";

export default function Spinner() {
  return (
    <Loader active inline="centered">
      Loading...
    </Loader>
  );
}
