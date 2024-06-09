import React from "react";
import "./pos.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
`;

const OuterContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  height: 70vh;
`;

const InnerContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 9fr;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 18px;
  background-color: rgb(204, 204, 204, 0.6);
  border-radius: 8px;
  width: 80%;
  min-width: 600px;
  min-height: 80%;
`;

const Header = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 10fr 1fr;
`;

const AboutContent = styled.div`
  padding: 36px;
`;

function AboutScreen() {
  const navigate = useNavigate();
  return (
    <OuterContainer>
      <InnerContainer>
        <Header>
          <IoMdArrowRoundBack
            size={50}
            style={{
              marginLeft: "6px",
              padding: "4px",
              color: "black",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/home");
            }}
          />
          <h1>CRUD Drive</h1>
          <IoMdArrowRoundBack
            size={50}
            style={{
              marginLeft: "6px",
              padding: "4px",
              color: "black",
              cursor: "pointer",
              visibility: "hidden",
            }}
            onClick={() => {}}
          />
        </Header>
        <AboutContent className="disc">
          Welcome to the CRUD Drive(online storage website!).
          <br /> We are thrilled to have you here and would like to share with
          you a bit about who we are and what we stand for. We recognize that as
          our digital lives become increasingly complex, we need reliable and
          secure solutions to store and access our data. That's where our online
          storage platform comes in. We offer a range of storage options for
          personal use. Our platform is designed with ease of use in mind, so
          you can quickly and easily upload, store, and share your files from
          anywhere in the world.
          <br /> We pride ourselves on providing top-notch security and
          protection for your data. We also use encryption and other security
          measures to protect your data from unauthorized access. At our online
          storage website, we are committed to providing our users with the best
          possible experience. Our customer support team is available 24/7 to
          answer any questions or concerns you may have, and we are constantly
          working to improve our platform and add new features to make your life
          easier. Thank you for choosing us as your online storage solution. We
          look forward to serving you and helping you keep your digital life
          organized and secure.
        </AboutContent>
      </InnerContainer>
    </OuterContainer>
  );
}

export default AboutScreen;
