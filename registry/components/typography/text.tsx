import * as React from "react";

import { Typography, type TypographyProps } from "./typography";

type TextProps = Omit<TypographyProps<React.ElementType>, "variant">;
type LargeProps = Omit<TypographyProps<React.ElementType>, "variant">;
type SmallProps = Omit<TypographyProps<React.ElementType>, "variant">;

function Text(props: TextProps) {
  return <Typography as="p" variant="p" {...props} />;
}

function Large(props: LargeProps) {
  return <Typography as="div" variant="large" {...props} />;
}

function Small(props: SmallProps) {
  return <Typography as="small" variant="small" {...props} />;
}

export { Large, Small, Text };
export type { LargeProps, SmallProps, TextProps };
