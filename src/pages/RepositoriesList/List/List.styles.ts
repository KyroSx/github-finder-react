import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  font-size: 20px;
  padding: 20px 0;

  border-bottom: 2px solid ${(props) => props.theme.colors.background2};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.colors.primary};
`;

export const PrivateBadge = styled.div`
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.colors.background2};
  border-radius: 14px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
`;

export const Footer = styled.div`
  font-size: 18px;
  margin-top: 6px;

  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Language = styled.span`
  text-transform: capitalize;
`;

export const UpdatedAt = styled.span``;
