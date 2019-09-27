import styled from 'styled-components';

export const Button = styled.button`
outline: none;
background:${props => props.active ? "#e1e1e1" : "white"};;
border: 1px solid #CCC;

`;