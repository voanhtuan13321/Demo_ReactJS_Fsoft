const role = {
  admin: 'admin',
  user: 'user',
};

const getIdOnLocalStorage = (role) => {
  switch (role) {
    case 'admin':
      return localStorage.getItem('idAdmin');
    case 'user':
      return localStorage.getItem('idUser');
    default:
      return undefined;
  }
};

const setIdOnLocalStorage = (role, id) => {
  switch (role) {
    case 'admin':
      localStorage.setItem('idAdmin', id);
      break;
    case 'user':
      localStorage.setItem('idUser', id);
      break;
    default:
      return;
  }
};

export { role, getIdOnLocalStorage, setIdOnLocalStorage };
