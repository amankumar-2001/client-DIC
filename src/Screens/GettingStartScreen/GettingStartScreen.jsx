import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ImageCard,
  FileCard,
  BlogCard,
  NoteCard,
} from "../../Components/Elements";
import "./GettingStartscreen.css";
import Create from "../../Components/Create";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import Loader from "../../Components/Loader";
import ErrorModal from "../../Components/ErrorModal";
import { editDataUrl, getDataUrl } from "../../apiDict";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const BlockTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: black;
  text-align: left;
`;

function GettingStartScreen() {
  const navigate = useNavigate();
  const [createModal, setCreateModal] = useState("");
  const [loading, setLoading] = useState([]);
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const [user] = useState(JSON.parse(localStorage.getItem("currentUser")));
  const allType = ["All", "Blogs", "Images", "Files", "Notes"];

  const getData = async ({ typeOfData, userId }) => {
    try {
      setLoading(true);
      const response = await axios.get(
        getDataUrl({
          typeOfData,
          userId,
        })
      );

      if (response.data.ok && response.data.res.ok) {
        setResult(response.data.res.data);
        setLoading(false);
      } else {
        setError(response.data.message || response.data.res.err);
      }
    } catch (err) {
      setError(err);
    }
  };

  const filterByType = (val) => {
    allType.forEach((typeId) => {
      let path = document.getElementById(typeId);
      if (typeId === val) {
        path.style.background = "black";
        path.style.color = "white";
      } else {
        path.style.background = "none";
        path.style.color = "black";
      }
    });

    getData({
      typeOfData: val.endsWith("s") ? val.slice(0, -1) : "",
      userId: user._id,
    });
  };

  const handleDelete = async ({ contentId, typeOfData, data, toDelete }) => {
    confirmAlert({
      title: "Delete!!",
      message: "Are you sure, You want to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.post(editDataUrl, {
                userId: user._id,
                contentId,
                typeOfData,
                data,
                toDelete,
              });
              getData({ typeOfData: "", userId: user._id });
            } catch (error) {
              setError(error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleEdit = async ({ contentId, typeOfData, data, toDelete }) => {
    try {
      await axios.post(editDataUrl, {
        userId: user._id,
        contentId,
        typeOfData,
        data,
        toDelete,
      });
      getData({ typeOfData: "", userId: user._id });
    } catch (error) {
      setError(error);
    }
  };

  const handleDownload = async ({ publicUrl, fileName }) => {
    try {
      const response = await axios({
        url: publicUrl,
        method: "GET",
        responseType: "blob",
      });

      const urlObject = window.URL || window.webkitURL;
      const blob = new Blob([response.data]);
      const downloadUrl = urlObject.createObjectURL(blob);

      const downloadEvent = document.createElement("a");
      downloadEvent.href = downloadUrl;
      downloadEvent.download = fileName;

      document.body.appendChild(downloadEvent);
      downloadEvent.click();
      document.body.removeChild(downloadEvent);
    } catch (error) {
      setError("Error downloading file:", error);
    }
  };

  useEffect(() => {
    if (createModal === "") {
      getData({ typeOfData: "", userId: user._id });
    }
  }, [createModal]);

  return (
    <div className="container mt-4">
      {error && <ErrorModal errorMessage={error} />}
      <div className="container shadow-lg p-3 bg-white rounded">
        <h1 className="title">CRUD Dashboard</h1>
        <div className="border-bottom border-dark d-flex justify-content-start">
          {allType.map((block) => {
            return (
              <button
                id={block}
                className="px-4 py-1 btn2 element border-end border-dark"
                onClick={() => {
                  filterByType(block);
                }}
              >
                {block}
              </button>
            );
          })}
          <button
            className="px-4 py-1 btn2 element"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={() => setCreateModal("show")}
          >
            Add
          </button>
        </div>
        <div className="outer mt-2">
          <div className="d-flex" style={{ flexDirection: "column" }}>
            {loading ? (
              <div className="container">
                <Loader size={20} />
              </div>
            ) : (
              ["Note", "File", "Image", "Blog"].map((block) => {
                return (
                  <>
                    {result[block].length > 0 && (
                      <BlockTitle>{block}s:</BlockTitle>
                    )}
                    <Container>
                      {result[block].map(
                        ({ data, metaData, typeOfData, contentId }, i) => {
                          return block === "Image" ? (
                            <ImageCard
                              key={i}
                              handleDelete={handleDelete}
                              data={data}
                              metaData={metaData}
                              typeOfData={typeOfData}
                              contentId={contentId}
                              onClick={() => {}}
                            />
                          ) : block === "File" ? (
                            <FileCard
                              key={i}
                              handleDelete={handleDelete}
                              data={data}
                              metaData={metaData}
                              typeOfData={typeOfData}
                              contentId={contentId}
                              handleDownload={handleDownload}
                            />
                          ) : block === "Blog" ? (
                            <BlogCard
                              key={i}
                              handleDelete={handleDelete}
                              data={data}
                              metaData={metaData}
                              typeOfData={typeOfData}
                              contentId={contentId}
                            />
                          ) : (
                            <NoteCard
                              key={i}
                              handleDelete={handleDelete}
                              data={data}
                              metaData={metaData}
                              typeOfData={typeOfData}
                              contentId={contentId}
                              handleEdit={handleEdit}
                            />
                          );
                        }
                      )}
                    </Container>
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>
      {createModal && <Create show={setCreateModal} />}
    </div>
  );
}

export default GettingStartScreen;
