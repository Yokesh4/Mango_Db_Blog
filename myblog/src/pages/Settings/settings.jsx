
import './settings.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'
const Settings = () => {
  const { user }= useContext(Context);
 
    const [file,setFile]=useState(null);
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleSubmit= async (e)=>{
      e.preventDefault();

      const updatedUser={
       userId:user._id,
       username,email,password,
      }
      let data;
      if(file){
       const data =new FormData();
       const filename=Date.now()+ file.name;
       data.append("name",filename);
       data.append("file",file);
       updatedUser.profilepPic=filename;
      }
      try{
       if (file) {
         await axios.post("/upload", data);
       }
      }catch(err){
       console.error(err);
      }
     try{
        await axios.put("/users"+user._id,updatedUser);
     
     }catch(err){
       console.error("Post creation failed:", err);
     }

}
  return (
    <div className='settings'>
        
        <div className="settingsWrapper">

            <div className="settingsTitle">
             
               <span className="settingsUpdateTitle">Update Your Account</span>
               <span className="settingsDeleteTitle">Delete Account</span>

            </div>
           
           <from className="settingsForm" onSubmit={handleSubmit}>
                  <label>Profile Picture</label>
                  <div className="settingsPP">

                    <img src={user.profilepPic} 
                    alt="" />
                    <label htmlFor="fileInput">
                    <i className="settingsPPIcon fa-regular fa-circle-user"></i>
                    </label>
                   
                    <input type="file" id='fileInput' style={{display:"none"}}
                    
                    onChange={e=>setFile(e.target.files[0])}
                    
                    />
                    
                  </div>
                  <label>Username</label>
                    <input type="text" placeholder={user.username}
                     onChange={e=>{
                         setUsername(e.target.value)

                    }}/>
                    <label>Email</label>
                    <input type="email" placeholder={user.email}
                     onChange={e=>{
                      setEmail(e.target.value)

                     }}  
                    
                    />
                    <label>Password</label>
                    <input type="password"
                     onChange={e=>{
                      setPassword(e.target.value)

                 }}
                    
                    />

                    <button className="settingsSubmit" type="submit">Update</button>
           </from>

        </div>
        <Sidebar/>
    </div>
  )
}

export default Settings