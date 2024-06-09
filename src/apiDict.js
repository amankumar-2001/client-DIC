const remoteUrl = "https://deep-into-crud.vercel.app/driveDIC";
// const localUrl = "http://localhost:5001/driveDIC";
const url = remoteUrl;

export const getUserUrl = `${url}/login/user`;

export const registerUserUrl = `${url}/register/user`;

export const getDataUrl = ({ userId, typeOfData }) => {
  return `${url}/drive/data/byUserId?userId=${userId}&typeOfData=${typeOfData}`;
};

export const saveDataUrl = `${url}/add/data`;

export const editDataUrl = `${url}/edit/data`;

export const editProfileUrl = `${url}/edit/profile`;

export const binDataUrl = ({ userId }) => {
  return `${url}/bin/data?userId=${userId}`;
};

export const messageByMailApi = `${url}/contact-us/message`;
