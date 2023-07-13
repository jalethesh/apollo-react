import {
  useState,
  useRef,
  useEffect,
  createRef,
  isValidElement,
  CSSProperties,
} from 'react';

import styled from '@emotion/styled';
import { TextField, TextFieldProps } from '@mui/material';
import { useClickAway } from 'react-use';

type IStartAdornment = (
  hover: boolean,
  typingMode: boolean,
  isFilledMode: boolean
) => JSX.Element;
export interface InputProps extends Omit<TextFieldProps, 'onChange' | 'ref'> {
  value?: string | number;
  errorText?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  startAdornment?: JSX.Element | IStartAdornment;
  className?: string;
  style?: CSSProperties;
  onChange?: (val: string | number) => void;
}

export const Input = ({
  disabled = false,
  type = 'input',
  ...props
}: InputProps) => {
  const containerRef = createRef<HTMLDivElement>();
  const [hover, setHover] = useState(false);
  const [typingMode, setTypingMode] = useState(false);
  const disableTypingMode = () => setTypingMode(false);

  const inputRef = useRef<HTMLInputElement>();

  const onInputContainerClicked = () => inputRef?.current?.focus();

  useClickAway(containerRef, disableTypingMode);

  const isFilledMode = props.value !== '' && !typingMode;
  useEffect(() => {
    if (!isFilledMode && props.value === '') {
      containerRef.current?.blur();
      inputRef.current?.blur();
      disableTypingMode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilledMode]);

  const StartAdornment = props.startAdornment
    ? isValidElement(props.startAdornment)
      ? props.startAdornment
      : (props.startAdornment as IStartAdornment)(
          hover,
          typingMode,
          isFilledMode
        )
    : '';

  return (
    <div className={props.className} style={props.style}>
      {!!props.label && (
        <Label isLighten={typingMode || isFilledMode}>
          {props.label}{' '}
          {props.required ? <span style={{ color: '#dc553b' }}>*</span> : ''}
        </Label>
      )}
      <InputContainer
        ref={containerRef}
        disabled={disabled}
        hasContent={!!props.value}
        onClick={onInputContainerClicked}
        onMouseMove={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        isFilledMode={isFilledMode}
        isTypingMode={typingMode}
        hasError={!!props.errorText}
      >
        {StartAdornment}
        <TextInput
          {...props}
          label={undefined}
          disabled={disabled}
          onFocus={() => setTypingMode(true)}
          ref={inputRef as any}
          onChange={(e: any) => props.onChange?.(e.target.value)}
        />
      </InputContainer>
      {props.errorText && <Error>{props.errorText}</Error>}
    </div>
  );
};

export default Input;

interface InputContainerProps {
  hasError: boolean;
  hasContent: boolean;
  isFilledMode: boolean;
  isTypingMode: boolean;
  disabled: boolean;
}

const InputContainer = styled.div<InputContainerProps>`
  border: 1px solid ${({ theme }) => theme.palette.grey[500]};
  box-sizing: border-box;
  border-radius: 6px;
  padding: 0.8rem 0.5rem;
  align-items: center;
  display: flex;
  position: relative;

  & > svg {
    margin-right: 6px;
  }

  & > svg path {
    width: 20px;
    height: 20px;
    stroke: ${({ theme }) => theme.palette.grey[400]};
    fill: ${({ theme }) => theme.palette.grey[400]};
  }
  ${({ disabled, theme }) =>
    !disabled &&
    `
      &:hover {
        cursor: pointer;
        background-color: ${theme.palette.grey[900]};
        border: 1px solid ${theme.palette.info.main};
      }
    `}

  ${({ isTypingMode, hasError, theme }) =>
    isTypingMode &&
    `
      box-shadow: 0 0 0 3px ${theme.palette.secondary.light};
      background-color: ${theme.palette.grey[900]};
      border: 1px solid ${
        hasError ? theme.palette.error.main : theme.palette.info.main
      };
    `}

  ${({ isFilledMode, disabled, hasError, theme }) =>
    isFilledMode &&
    !disabled &&
    `
      border: 1px solid ${
        hasError ? theme.palette.error.main : theme.palette.grey[500]
      };
    `}

  ${({ disabled, theme }) =>
    disabled &&
    `
      border: 1px solid ${theme.palette.grey[400]};
      background-color: ${theme.palette.grey[800]};
    `}
`;
const TextInput = styled(TextField)`
  flex-grow: 1;
  background-color: transparent;
  height: 100%;
  padding-left: 0.5rem;
  & fieldset {
    border: none;
    outline: none;
  }

  & .MuiOutlinedInput-root {
    height: 100%;
    padding: 0;
  }
  & .MuiOutlinedInput-input {
    padding: 0;
    height: 100%;
  }
  &::placeholder {
    color: ${({ theme }) => theme.palette.grey[100]};
  }
  &:disabled {
    color: ${({ theme }) => theme.palette.grey[200]};
  }
`;

const Error = styled.span`
  margin-top: 12px;
  display: inline-block;
  color: ${({ theme }) => theme.palette.error.main};
`;

interface LabelProps {
  isLighten: boolean;
}

const Label = styled.div<LabelProps>`
  color: ${({ theme, isLighten }) =>
    isLighten ? theme.palette.text.secondary : theme.palette.grey[100]};
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
  margin-top: 6px;
  margin-left: 6px;
  font-family: 'Lato';
`;
