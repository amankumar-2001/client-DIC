import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import "react-confirm-alert/src/react-confirm-alert.css";
import styled from "styled-components";
import { FaFilePdf } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa";
import { RiFilePpt2Fill } from "react-icons/ri";
import { BsFillEyeFill } from "react-icons/bs";
import Modal from "./Modal";

const FileContainer = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid #ccc;
  background: #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FileContent = styled.div`
  display: flex;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const FileTitle = styled.div`
  padding-left: 12px;
  font-size: larger;
  color: black;
`;

const FileLeft = styled.div`
  padding-right: 12px;
  font-size: larger;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CardContainer = styled.div`
  position: relative;
  width: 300px;
  border-radius: 8px;
  overflow: hidden;
  margin: 16px;
  height: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;

  &:hover .overlay {
    opacity: 1;
  }
`;

const CardImage = styled.img`
  width: ${({ width }) => width}%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
`;

const Overlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: black;
`;

const BlogContainer = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  background: #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BlogTop = styled.div`
  padding: 12px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
`;

const NoteContainer = styled.div`
  width: 40%;
  display: flex;
  border: 1px solid #ccc;
  background: #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NoteContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Note = styled.textarea`
  padding: 12px;
  font-size: larger;
  color: black;
  width: 100%;
  text-align: left;
  background: none;
  border: 1px solid black;
`;

const NoteData = styled.div`
  padding: 12px;
  font-size: larger;
  color: black;
  width: 100%;
  text-align: left;
`;

const NoteTop = styled.div`
  padding-right: 12px;
  font-size: larger;
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  flex-direction: row-reverse;
`;

const getFileTypeFromMimeType = (mimeType) => {
  const mimeTypeMapping = {
    "application/pdf": "PDF Document",
    "application/msword": "Microsoft Word Document",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "Microsoft Word Document (DOCX)",
    "application/vnd.ms-excel": "Microsoft Excel Spreadsheet",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      "Microsoft Excel Spreadsheet (XLSX)",
    "application/vnd.ms-powerpoint": "Microsoft PowerPoint Presentation",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "PowerPoint (PPTX)",
    "text/plain": "Plain Text Document",
    "text/html": "HTML Document",
    "image/jpeg": "JPEG Image",
    "image/png": "PNG Image",
    "image/gif": "GIF Image",
    "audio/mp3": "MP3 Audio",
    "video/mp4": "MP4 Video",
  };

  const defaultFileType = "Unknown File Type";

  return mimeTypeMapping[mimeType] || defaultFileType;
};

const ImageContainer = styled.div`
  text-align: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 600px;
`;

const ImagePreview = ({ src, preview, setPreview }) => {
  return (
    <ImageContainer>
      <Modal isOpen={preview} onClose={() => setPreview(false)}>
        <Image src={src} alt="Preview" />
      </Modal>
    </ImageContainer>
  );
};

export const ImageCard = ({
  data,
  metaData,
  typeOfData,
  contentId,
  handleDelete,
  handleDownload,
  setShowConfirmationPopup,
}) => {
  const [preview, setPreview] = useState(false);
  return (
    <CardContainer>
      <CardImage
        src={metaData?.publicURL}
        alt={metaData?.fileName}
        width={100}
        isBlog={false}
      />
      <ImagePreview
        src={metaData?.publicURL}
        preview={preview}
        setPreview={setPreview}
      />
      <Overlay className="overlay">
        <BsFillEyeFill
          size={45}
          style={{ padding: "4px", color: "white" }}
          onClick={() => setPreview(true)}
        />
        <IoMdDownload
          size={45}
          style={{ padding: "4px", color: "white" }}
          onClick={() => {
            handleDownload({
              publicUrl: metaData?.publicURL,
              fileName: metaData?.fileName,
            });
          }}
        />
        <MdDelete
          size={45}
          style={{ padding: "4px", color: "white" }}
          onClick={() => {
            setShowConfirmationPopup({
              title: "Confirmation!!",
              message: "Are you sure, you want to delete?",
              closeBtnText: "Cancel",
              closeBtnFunction: () => {
                setShowConfirmationPopup(null);
              },
              confirmBtnText: "Delete",
              confirmBtnFunction: () => {
                handleDelete({ contentId, typeOfData, data, toDelete: true });
              },
              successPopupText: "Deleted successfully",
              successPopupBtnText: "Okay",
              successPopupBtnFunction: () => {
                setShowConfirmationPopup(null);
              },
              errorPopupBtnText: "Okay",
              errorPopupBtnFunction: () => {
                setShowConfirmationPopup(null);
              },
              state: "not-set",
            });
          }}
        />
      </Overlay>
    </CardContainer>
  );
};

export const FileCard = ({
  data,
  metaData,
  typeOfData,
  contentId,
  handleDelete,
  handleDownload,
  setShowConfirmationPopup,
}) => {
  return (
    <FileContainer>
      {["application/pdf"].includes(metaData.fileType) ? (
        <FaFilePdf size={45} style={{ padding: "4px" }} />
      ) : ["text/csv", "excel"].includes(metaData.fileType) ? (
        <FaFileExcel size={45} style={{ padding: "4px" }} />
      ) : [
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ].includes(metaData.fileType) ? (
        <RiFilePpt2Fill size={45} style={{ padding: "4px" }} />
      ) : (
        <></>
      )}
      <FileContent>
        <FileTitle>{metaData?.fileName}</FileTitle>
        <FileLeft>
          {getFileTypeFromMimeType(metaData?.fileType)}
          <IoMdDownload
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDownload({
                publicUrl: metaData?.publicURL,
                fileName: metaData?.fileName,
              });
            }}
          />
          <MdDelete
            style={{ cursor: "pointer" }}
            size={25}
            onClick={() => {
              setShowConfirmationPopup({
                title: "Confirmation!!",
                message: "Are you sure, you want to delete?",
                closeBtnText: "Cancel",
                closeBtnFunction: () => {
                  setShowConfirmationPopup(null);
                },
                confirmBtnText: "Delete",
                confirmBtnFunction: () => {
                  handleDelete({ contentId, typeOfData, data, toDelete: true });
                },
                successPopupText: "Deleted successfully",
                successPopupBtnText: "Okay",
                successPopupBtnFunction: () => {
                  setShowConfirmationPopup(null);
                },
                errorPopupBtnText: "Okay",
                errorPopupBtnFunction: () => {
                  setShowConfirmationPopup(null);
                },
                state: "not-set",
              });
            }}
          />
        </FileLeft>
      </FileContent>
    </FileContainer>
  );
};

export const BlogCard = ({
  data,
  metaData,
  typeOfData,
  contentId,
  handleDelete,
  setShowConfirmationPopup,
}) => {
  return (
    <BlogContainer>
      <BlogTop>
        <CardImage
          src={metaData?.publicURL}
          alt={metaData?.fileName}
          width={50}
          isBlog={true}
        />
        <MdDelete
          size={25}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowConfirmationPopup({
              title: "Confirmation!!",
              message: "Are you sure, you want to delete?",
              closeBtnText: "Cancel",
              closeBtnFunction: () => {
                setShowConfirmationPopup(null);
              },
              confirmBtnText: "Delete",
              confirmBtnFunction: () => {
                handleDelete({ contentId, typeOfData, data, toDelete: true });
              },
              successPopupText: "Deleted successfully",
              successPopupBtnText: "Okay",
              successPopupBtnFunction: () => {
                setShowConfirmationPopup(null);
              },
              errorPopupBtnText: "Okay",
              errorPopupBtnFunction: () => {
                setShowConfirmationPopup(null);
              },
              state: "not-set",
            });
          }}
        />
      </BlogTop>
      <CardContent>
        <CardText>{data}</CardText>
      </CardContent>
    </BlogContainer>
  );
};

export const NoteCard = ({
  data,
  metaData,
  typeOfData,
  contentId,
  handleDelete,
  handleEdit,
  setShowConfirmationPopup,
}) => {
  const [editText, setEditText] = useState(false);
  const [note, setNote] = useState(data);

  return (
    <NoteContainer>
      <NoteContent>
        <NoteTop>
          <MdDelete
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowConfirmationPopup({
                title: "Confirmation!!",
                message: "Are you sure, you want to delete?",
                closeBtnText: "Cancel",
                closeBtnFunction: () => {
                  setShowConfirmationPopup(null);
                },
                confirmBtnText: "Delete",
                confirmBtnFunction: () => {
                  handleDelete({ contentId, typeOfData, data, toDelete: true });
                },
                successPopupText: "Note deleted successfully",
                successPopupBtnText: "Okay",
                successPopupBtnFunction: () => {
                  setShowConfirmationPopup(null);
                },
                errorPopupBtnText: "Okay",
                errorPopupBtnFunction: () => {
                  setShowConfirmationPopup(null);
                },
                state: "not-set",
              });
            }}
          />
          <MdEdit
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditText((prevEditText) => prevEditText ^ true);
            }}
          />
          {editText ? (
            <FaSave
              style={{ cursor: "pointer" }}
              size={25}
              onClick={() => {
                setShowConfirmationPopup({
                  title: "Confirmation!!",
                  message: "Are you sure, you want to save changes?",
                  closeBtnText: "Cancel",
                  closeBtnFunction: () => {
                    setShowConfirmationPopup(null);
                  },
                  confirmBtnText: "Save Changes",
                  confirmBtnFunction: () => {
                    handleEdit({
                      contentId,
                      typeOfData,
                      data: note,
                      toDelete: false,
                    });
                  },
                  successPopupText: "Changes saved successfully",
                  successPopupBtnText: "Okay",
                  successPopupBtnFunction: () => {
                    setShowConfirmationPopup(null);
                  },
                  errorPopupBtnText: "Okay",
                  errorPopupBtnFunction: () => {
                    setShowConfirmationPopup(null);
                  },
                  state: "not-set",
                });

                setEditText(true);
              }}
            />
          ) : (
            <></>
          )}
        </NoteTop>
        {editText ? (
          <Note
            type="textarea"
            value={note}
            rows={5}
            onChange={(e) => setNote(e.target.value)}
          />
        ) : (
          <NoteData>{data}</NoteData>
        )}
      </NoteContent>
    </NoteContainer>
  );
};
