const storeToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  export default storeToken;