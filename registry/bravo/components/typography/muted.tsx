import * as React from "react";

import { Typography, type TypographyProps } from "./typography";

type MutedProps = Omit<TypographyProps<React.ElementType>, "variant">;

function Muted(props: MutedProps) {
  return <Typography as="p" variant="muted" {...props} />;
}

export { Muted };
export type { MutedProps };
