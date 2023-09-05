import styled from 'styled-components'

export const Footer = styled.footer`
  padding: 2rem 0;
  text-align: center;
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.layers[1].background};
  border-top: 1px solid ${props => props.theme.colors.layers[1].border};
`

export const Main = styled.main`
  flex: 1;
  padding-top: 113px;
`

export const Header = styled.header`
  padding: 2rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  color: ${props => props.theme.colors.title};
  background-color: ${props => props.theme.colors.layers[1].background};
  border-bottom: 1px solid ${props => props.theme.colors.layers[1].border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.theme.colors.layers[0].background};
`
