import React, { useState } from "react";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineWidgets } from "react-icons/md";
import { ImBin } from "react-icons/im";
import { MdOutlineSettings } from "react-icons/md";
import CreateDropDown from "./CreateDropDown";
import { BIN, EXPLORE, HOME, SETTING } from "../Utils/constant";

const SidebarContainer = styled.div`
  height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;

  &:hover {
  }
`;

const SidebarItem = styled.div`
  width: 100%;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #444;
  }
`;

const IconWrapper = styled.div`
  margin-right: 10px;
`;

const SidebarText = styled.span`
  font-size: 16px;
`;

const SideBarNav = styled.div`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({ collapse }) => (collapse ? "50px" : "200px")};
  gap: 4px;
  justify-content: space-evenly;
`;

const SideBarItem = styled.li`
  width: 100%;
  min-width: ${({ collapse }) => (collapse ? "30px" : "90px")};
  min-height: 32px;
  display: flex;
  justify-content: flex-start;
  padding: 6px 12px;
  gap: 12px;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#444" : "")};

  &:hover {
    opacity: 1;
    background-color: #444;
  }
`;

const SideBarLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: ${({ active }) => (active ? "bold" : "")};
  &:hover {
    color: white;
  }
`;

const CreateNew = styled.div`
  border-radius: 12px;
  color: black;
  font-size: 18px;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: 600;
  text-decoration: none;
  padding: 6px 20px;
  border: 1px solid black;
  margin-bottom: 24px;

  &:hover {
    background: #6c757d;
  }
`;

const Sidebar = ({
  onClinkNew,
  selectedTabForNew,
  setSelectedTabForNew,
  setCurrentBlock,
  selectedSideBarTab,
  setSelectedSideBarTab,
}) => {
  const [createNew, setCreateNew] = useState(false);

  const [collapse, setCollapse] = useState(false);

  return (
    <SidebarContainer
      onHover={() => {
        setCollapse(true);
      }}
      onHoverOut={() => {
        setCollapse(false);
      }}
    >
      <SideBarNav collapse={collapse}>
        <CreateNew
          onClick={() => {
            setCreateNew(createNew ? false : true);
          }}
        >
          {collapse ? "+" : "+ New"}
        </CreateNew>
        {createNew ? (
          <CreateDropDown
            onClose={() => {
              setCreateNew(false);
            }}
            setSelectedTab={(val) => {
              setSelectedTabForNew(val);
              setCreateNew(false);
            }}
            selectedTab={selectedTabForNew}
            setCurrentBlock={setCurrentBlock}
          />
        ) : null}

        <SideBarItem
          collapse={collapse}
          active={selectedSideBarTab === HOME}
          onClick={() => {
            setSelectedSideBarTab(HOME);
          }}
        >
          <IconWrapper>
            <FaHome size={25} />
          </IconWrapper>
          {!collapse && (
            <SideBarLink to="/home" active={selectedSideBarTab === HOME}>
              Home
            </SideBarLink>
          )}
        </SideBarItem>

        {false && (
          <SideBarItem
            collapse={collapse}
            active={selectedSideBarTab === EXPLORE}
            onClick={() => {
              setSelectedSideBarTab(EXPLORE);
            }}
          >
            <IconWrapper>
              <MdOutlineWidgets size={25} />
            </IconWrapper>

            {!collapse && (
              <SideBarLink active={selectedSideBarTab === EXPLORE}>
                Explore
              </SideBarLink>
            )}
          </SideBarItem>
        )}

        {false && (
          <SideBarItem
            collapse={collapse}
            active={selectedSideBarTab === SETTING}
            onClick={() => {
              setSelectedSideBarTab(SETTING);
            }}
          >
            <IconWrapper>
              <MdOutlineSettings size={25} />
            </IconWrapper>

            {!collapse && (
              <SideBarLink active={selectedSideBarTab === SETTING}>
                Settings
              </SideBarLink>
            )}
          </SideBarItem>
        )}

        <SideBarItem
          collapse={collapse}
          active={selectedSideBarTab === BIN}
          onClick={() => {
            setSelectedSideBarTab(BIN);
          }}
        >
          <IconWrapper>
            <ImBin size={25} />
          </IconWrapper>

          {!collapse && (
            <SideBarLink active={selectedSideBarTab === BIN}>Bin</SideBarLink>
          )}
        </SideBarItem>
      </SideBarNav>
    </SidebarContainer>
  );
};

export default Sidebar;
