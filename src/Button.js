import React, { Fragment } from 'react';
import styled from 'styled-components';

const button = props => {
  return (
    <Fragment>
      <ButtonBox>
        <Button type={props.type} onClick={props.clicked}>
          {props.name}
        </Button>
      </ButtonBox>
    </Fragment>
  );
};

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 75%;
  margin: 0 auto;
`;

const Button = styled.button`
  color: #ffffff;
  background-color: rgb(26, 88, 167);
  width: 100px;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  letter-spacing: 1.1px;
`;

export default button;
