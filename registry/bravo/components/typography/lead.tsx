import * as React from "react";

import { Typography, type TypographyProps } from "./typography";

type LeadProps = Omit<TypographyProps<React.ElementType>, "variant">;

function Lead(props: LeadProps) {
  return <Typography as="p" variant="lead" {...props} />;
}

export { Lead };
export type { LeadProps };
