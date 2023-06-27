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
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 8px;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.green};
  color: ${({ theme }) => theme.colors.background_light};
  padding: 8px 16px;
  border: none;
  cursor: pointer;
`;
