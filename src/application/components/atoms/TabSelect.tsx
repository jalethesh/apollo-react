import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface TabSelectProps {
  tabs: { name: string; label: string; disabled?: boolean }[];
  activeTab: string;
  setSelected: (name: string) => void;
}

export const TabSelect: React.FC<TabSelectProps> = ({
  tabs,
  activeTab,
  setSelected,
}) => {
  const onTabSelect = (name: string) => {
    setSelected(name);
  };

  return (
    <StyledRoot>
      {tabs.map((tab, index) => (
        <StyledTab
          key={index}
          isActive={activeTab === tab.name}
          onClick={tab.disabled ? () => {} : () => onTabSelect(tab.name)} // eslint-disable-line
        >
          {tab.label}
        </StyledTab>
      ))}
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  height: 28px;
  border-radius: 7px;
  padding: 2px;
  background-color: ${({ theme }) => theme.palette.grey[700]};
  display: flex;
  overflow: hidden;
`;

interface ITabButton {
  isActive: boolean;
}

const StyledTab = styled.div<ITabButton>`
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  justify-content: center;
  overflow: auto;
  height: 100%;
  align-items: center;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: 600;
  font-size: 0.813rem;
  line-height: 1.25rem;
  letter-spacing: -0.005rem;
  ${({ isActive, theme }) =>
    isActive &&
    css`
      background-color: ${theme.palette.grey[900]};
      border-radius: 7px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12), 0 3px 1px rgba(0, 0, 0, 0.04);
    `}
`;
