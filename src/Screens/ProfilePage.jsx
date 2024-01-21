import { DateTime } from "luxon";
import React, { useState } from "react";
import styled from "styled-components";

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProfileName = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: white;
`;

const ProfileBio = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
  color: white;
`;

const ProfilePage = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("currentUser")));
  return (
    <ProfileContainer>
      <ProfileName>{user.name}</ProfileName>
      <ProfileBio>
        Email: {user.email}
      </ProfileBio>
      <ProfileBio>
        {/* Register at: {DateTime.fromJSDate(user.createdAt).toFormat("dd-MM-YYYY")} */}
      </ProfileBio>
    </ProfileContainer>
  );
};

export default ProfilePage;
