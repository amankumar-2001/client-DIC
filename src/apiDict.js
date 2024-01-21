const remoteUrl = "https://deep-into-crud.vercel.app/driveDIC";
// const localUrl = "http://localhost:5001/driveDIC";
const url = remoteUrl;

export const getUserUrl = ({ email, password }) => {
  return `${url}/login/user?email=${email}&password=${password}`;
};

export const registerUserUrl = `${url}/register/user`;

export const getDataUrl = ({ userId, typeOfData }) => {
  return `${url}/drive/data/byUserId?userId=${userId}&typeOfData=${typeOfData}`;
};

export const saveDataUrl = `${url}/add/data`;

export const editDataUrl = `${url}/edit/data`;
