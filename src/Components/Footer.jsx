import React from "react";
import styled from "styled-components";

const FooterDiv = styled.div`
  color: white;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgb(0, 0, 0);
`;

function Footer() {
  return (
    <FooterDiv>
      <footer className="py-1">
        <p>&copy; 2022 Apcode15, Inc. All rights reserved.</p>
      </footer>
    </FooterDiv>
  );
}

export default Footer;
