import * as React from "react";

import { Typography, type TypographyProps } from "./typography";

type BlockquoteProps = Omit<TypographyProps<React.ElementType>, "variant">;

function Blockquote(props: BlockquoteProps) {
  return <Typography as="blockquote" variant="blockquote" {...props} />;
}

export { Blockquote };
export type { BlockquoteProps };
