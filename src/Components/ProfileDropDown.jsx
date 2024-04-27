import React from "react";
import { styled } from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { connect } from "react-redux";

const ProfileWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ProfileDivContainer = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  align-items: center;
  height: 250px;
  width: 300px;
  position: absolute;
  top: 61px;
  right: 12px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const EmailText = styled.div``;

const ProfileImage = styled.div``;

const MessageText = styled.div`
  font-size: 28px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

const EditProfile = styled.button`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 40px 0px 0px 40px;
  width: 40%;
  height: 40px;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 7px 10px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-right: 1px solid white;
  color: white;
  background-color: black;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: grey;
    color: black;
  }
`;

const SignOut = styled.button`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0px 40px 40px 0px;
  width: 40%;
  height: 40px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 7px 10px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-left: 1px solid white;
  color: white;
  background-color: black;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: grey;
    color: black;
  }
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  padding: 4px;
  border-radius: 50%;
  object-fit: cover;
`;

function ProfileDropDown({
  onClose,
  logOut,
  onClickEditProfile,
  userFirstName,
  userEmail,
  userId,
  userProfileImage,
}) {
  return (
    <ProfileWrapper onClick={onClose}>
      <ProfileDivContainer>
        <EmailText>{userEmail} </EmailText>
        {userProfileImage ? (
          <ImagePreview src={userProfileImage} alt="Image Preview" />
        ) : (
          <FaUserCircle size={100} style={{ padding: "4px", color: "black" }} />
        )}
        <MessageText>Hi, {userFirstName}!</MessageText>
        <ButtonContainer>
          <EditProfile onClick={onClickEditProfile}>
            <MdOutlineModeEditOutline
              size={25}
              style={{ padding: "4px", color: "white" }}
            />
            Edit Profile
          </EditProfile>
          <SignOut onClick={logOut}>
            <GoSignOut size={25} style={{ padding: "4px", color: "white" }} />
            Sign out
          </SignOut>
        </ButtonContainer>
      </ProfileDivContainer>{" "}
    </ProfileWrapper>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    userFirstName: state.user.firstName,
    userLastName: state.user.lastName,
    userEmail: state.user.email,
    userId: state.user.userId,
    userProfileImage: state.user.profileImage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDropDown);
