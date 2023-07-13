import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Stack } from '@mui/material';

interface StepperProps {
  steps: number;
  selectedStep: number;
  className?: string;
  onSelect: (val: number) => void;
}
export const Stepper = (props: StepperProps) => (
  <Stack
    className={props.className}
    flexDirection="row"
    gap={1}
    justifyContent="center"
    alignItems="center"
    sx={{ cursor: 'pointer' }}
  >
    {new Array(props.steps).fill('').map((step, idx) => (
      <StepDot
        key={idx}
        onClick={() => props.onSelect(idx)}
        $selected={props.selectedStep === idx}
      />
    ))}
  </Stack>
);

const StepDot = styled.div<{ $selected: boolean }>`
  width: 7px;
  height: 5px;
  border-radius: 95px;
  opacity: 0.3;
  background: #6c6c70;
  ${({ $selected }) =>
    $selected &&
    css`
      background-color: #007aff;
      opacity: 1;
      width: 13px;
      height: 8px;
    `}
`;
