import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

export const Header = styled.header`
  background-color: #24292e;
  color: ${({ theme }) => theme.colors.background_light};
  padding: 16px;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  gap: 10px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 16px;

  font-size: 22px;
  border: 1px solid ${({ theme }) => theme.colors.background2};
  border-radius: 6px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.3);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background};
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  font-size: 22px;
  padding: 14px 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.background_light};
  background-color: ${({ theme }) => theme.colors.green};
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.green_bold};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
  }
`;
