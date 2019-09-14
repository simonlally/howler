import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

export default function Spinner() {
  return (
    <Loader active inline="centered">
      Loading...
    </Loader>
  );
}
