import { userList } from "../model/userModel.js"

export function handleUsers(req,res){

    const usersData = userList()
    console.log(usersData)
  res.render('user',{users:usersData});
}