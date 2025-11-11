import type { ComponentProps, ReactElement } from "react";
import { Box } from "panda/jsx";
import { Input } from "./recipes/atomic/Input";

type IconInputProps = {
  startAdornment?: ReactElement;
  endAdornment?: ReactElement;
} & ComponentProps<typeof Input>;

function IconInput(
  {
    startAdornment,
    endAdornment,
    ...rest
  }: IconInputProps,
): ReactElement {
  const hasStartAdornment = startAdornment !== undefined;
  const hasEndAdornment = endAdornment !== undefined;

  return (
    <Box
      display="inline-block"
      position="relative"
      width="215px"
    >
      {hasStartAdornment && (
        <Box
          alignItems="center"
          display="flex"
          left="13px"
          pointerEvents="none"
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          zIndex={1}
        >
          {startAdornment}
        </Box>
      )}
      <Input
        {...rest}
        pl={hasStartAdornment ? "40px" : "13px"}
        pr={hasEndAdornment ? "40px" : "13px"}
      />
      {hasEndAdornment && (
        <Box
          alignItems="center"
          display="flex"
          position="absolute"
          right="13px"
          top="50%"
          transform="translateY(-50%)"
          zIndex={1}
        >
          {endAdornment}
        </Box>
      )}
    </Box>
  );
}
export default IconInput;
