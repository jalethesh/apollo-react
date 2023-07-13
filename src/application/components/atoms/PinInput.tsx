import { ChangeEvent, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { Box, OutlinedInput } from '@mui/material';

interface PinInputProps {
  submitCB: (enteredPin: string) => void;
}

// TODO: refactor in a more compact and extendable way
export const PinInput: React.FC<PinInputProps> = ({ submitCB }) => {
  const first = useRef<HTMLInputElement>();
  const second = useRef<HTMLInputElement>();
  const third = useRef<HTMLInputElement>();
  const fourth = useRef<HTMLInputElement>();

  const [firstVal, setFirstVal] = useState('');
  const [secondVal, setSecondVal] = useState('');
  const [thirdVal, setThirdVal] = useState('');
  const [fourthVal, setFourthVal] = useState('');

  const onFirstChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let value = event.target.value;
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    if (value.matchAll(/[0-9]*/g)) {
      setFirstVal(value);
      if (value !== '') {
        second.current?.click();
      }
    }
  };
  const onSecondChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let value = event.target.value;
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    if (value.matchAll(/[0-9]*/g)) {
      setSecondVal(value);
      if (value !== '') {
        third.current?.click();
      }
    }
  };
  const onThirdChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let value = event.target.value;
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    if (value.matchAll(/[0-9]*/g)) {
      setThirdVal(value);
      if (value !== '') {
        fourth.current?.click();
      }
    }
  };
  const onFourthChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let value = event.target.value;
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    if (value.matchAll(/[0-9]*/g)) {
      setFourthVal(value);
      if (value !== '') {
        onSubmit(value);
      }
    }
  };

  const onSubmit = (finalLastVal: string) => {
    if (firstVal && secondVal && thirdVal && finalLastVal) {
      submitCB(`${firstVal}${secondVal}${thirdVal}${finalLastVal}`);
    }
  };

  const onKeyPressHandler = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', columnGap: '6px' }}>
      <StyledOutlinedInput
        type="number"
        onKeyPress={onKeyPressHandler}
        value={firstVal}
        ref={first}
        onChange={onFirstChange}
      />
      <StyledOutlinedInput
        type="number"
        onKeyPress={onKeyPressHandler}
        value={secondVal}
        ref={second}
        onChange={onSecondChange}
      />
      <StyledOutlinedInput
        type="number"
        onKeyPress={onKeyPressHandler}
        value={thirdVal}
        ref={third}
        onChange={onThirdChange}
      />
      <StyledOutlinedInput
        type="number"
        onKeyPress={onKeyPressHandler}
        value={fourthVal}
        ref={fourth}
        onChange={onFourthChange}
      />
    </Box>
  );
};

const StyledOutlinedInput = styled(OutlinedInput)`
  width: 62px;
  height: 62px;
  border-radius: 6px;

  > input {
    -moz-appearance: textfield;
    text-align: center;
  }

  > input::-webkit-outer-spin-button,
  > input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
