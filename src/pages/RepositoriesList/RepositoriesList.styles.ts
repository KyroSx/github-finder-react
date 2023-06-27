import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f6f8fa;
  min-height: 100vh;
`;

export const Header = styled.header`
  background-color: #24292e;
  color: #fff;
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
  background-color: #28a745;
  color: #fff;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
`;
