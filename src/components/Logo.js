import React from "react";
import { Image } from "semantic-ui-react";

const Logo = ({ imgSource }) => (
  <Image src={imgSource} size="medium" circular />
);

export default Logo;
