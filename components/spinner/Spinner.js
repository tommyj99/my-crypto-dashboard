import React, { Fragment } from "react";
import Image from "next/image";

const Spinner = () => (
  <Fragment>
    <Image src={"/spinner.gif"} width="350" height="350" alt="Loading..." />
  </Fragment>
);

export default Spinner;
