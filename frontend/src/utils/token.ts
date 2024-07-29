export const storeToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  export const getToken = () => {
    return localStorage.getItem("token");
  }

export const handleToken = (userId:string,role:string) =>{
  localStorage.setItem('id',userId);
  localStorage.setItem('role',role);
}

export const getUserId = () =>{
  return localStorage.getItem('id');
}

export const getrole = () =>{
  return localStorage.getItem('role');
}