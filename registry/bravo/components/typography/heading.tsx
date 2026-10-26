import * as React from "react";

import { Typography, type TypographyProps } from "./typography";

type HeadingProps = Omit<TypographyProps<React.ElementType>, "variant">;

function Display(props: HeadingProps) {
  return <Typography as="h1" variant="display" {...props} />;
}

function H1(props: HeadingProps) {
  return <Typography as="h1" variant="h1" {...props} />;
}

function H2(props: HeadingProps) {
  return <Typography as="h2" variant="h2" {...props} />;
}

function H3(props: HeadingProps) {
  return <Typography as="h3" variant="h3" {...props} />;
}

function H4(props: HeadingProps) {
  return <Typography as="h4" variant="h4" {...props} />;
}

function H5(props: HeadingProps) {
  return <Typography as="h5" variant="h5" {...props} />;
}

function H6(props: HeadingProps) {
  return <Typography as="h6" variant="h6" {...props} />;
}

export { Display, H1, H2, H3, H4, H5, H6 };
export type { HeadingProps };
