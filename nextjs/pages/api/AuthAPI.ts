import axios from "axios";
import { User } from "../types/User"


const getUser = async () => {
  const { data } = await axios.get<User>('api/users')
  return data
}

const login = async ({email, password}: {email:string, password:string}) => {
  
}