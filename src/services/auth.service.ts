import useAxios from "../hooks/axios.hook";
import handlePromise from "../utils/promise";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";



 

type AccessTokenResponse = {
  accessToken: string;
};

export const useAuthService = () => {
  const { axiosInstance, updateAuthToken } = useAxios();

  
  const login = async (mail: string, password:string): Promise<void> => {
    
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if(!regex.test(mail))
    {
      const msg = "bad user";
      return Promise.reject(msg);
    }

    if(!password) 
    {
      const msg = "password empty";
      return Promise.reject(msg);
    }

    
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `/auth/login`,
      headers:{
        "Content-Type":"application/json",
        "Accept":"*/*"
      },
      data: {
        email: mail,
        password: password
      },
    };

    const [response, err] = await handlePromise<AxiosResponse<AccessTokenResponse>, AxiosError<any>>(
      axiosInstance(config),
    );
    
    if (err) {
      const msg = err.response?.data?.message || "there was a problem sending the request";
      return Promise.reject(msg);
    }

    if (!response) {
      return Promise.reject("Login response is empty"); /* Fixme: throw a better error */
    }

    updateAuthToken(response.data.accessToken);
  };

  return {
    login,
  };
};


export  const useRegister = () => {
  const { axiosInstance, updateAuthToken } = useAxios();
  const register = async (param: {nombre : string ,apellido : string,dni : number,email : string,password : string} ,  otp:string | undefined ): Promise<void> => {
    
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
    const config: AxiosRequestConfig = {
      method: "POST",
      url: `/auth/register/${otp}`,
      headers:{
        "Content-Type":"application/json",
        "Accept":"*/*"
      },
      data: param,
    };

    const [response, err] = await handlePromise<AxiosResponse<AccessTokenResponse>, AxiosError<any>>(
      axiosInstance(config),
    );
    
    if (err) {
      const msg = err.response?.data?.message || "there was a problem sending the request";
      return Promise.reject(msg);
    }

    if (!response) {
      return Promise.reject("Login response is empty"); /* Fixme: throw a better error */
    }
  };

  return {
    register,
  };
};
    