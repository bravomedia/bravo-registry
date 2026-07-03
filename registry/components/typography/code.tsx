import * as React from "react";

import { Typography, type TypographyProps } from "./typography";

type CodeProps = Omit<TypographyProps<React.ElementType>, "variant">;
type KbdProps = Omit<TypographyProps<React.ElementType>, "variant">;

function Code(props: CodeProps) {
  return <Typography as="code" variant="code" {...props} />;
}

function Kbd(props: KbdProps) {
  return <Typography as="kbd" variant="kbd" {...props} />;
}

export { Code, Kbd };
export type { CodeProps, KbdProps };
