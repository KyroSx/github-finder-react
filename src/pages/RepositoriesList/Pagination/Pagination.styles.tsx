import styled from 'styled-components';

export const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

export const PageButton = styled.button<{ disabled: boolean }>`
  background-color: transparent;
  color: ${({ disabled }) => (disabled ? '#999' : '#0366d6')};
  border: none;
  padding: 6px 12px;
  margin: 0 2px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;

  &:hover {
    text-decoration: ${({ disabled }) => (disabled ? 'none' : 'underline')};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.3);
  }
}`;
