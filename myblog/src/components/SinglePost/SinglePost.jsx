import { useLocation } from 'react-router-dom'
import './SinglePost.css'
import { useEffect, useState,useContext } from 'react';
import axios from "axios"
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';


const SinglePost = () => {

  const location=useLocation();
  const path=location.pathname.split("/")[2];
  const [post,setPost]=useState({});
  const PF = "http://localhost:5000/images/";
  const {user} = useContext(Context);

  const [title,setTitle]=useState("")
  const [desc,setDesc]=useState("")
  const [updateMode,setUpdatedMode]=useState(false)

  useEffect(()=>{
    const getPost= async ()=>{
      const res= await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);


    };

    getPost();

  },[path]);

  const handleDelete =async()=>{
     try{
      await axios.delete(`/posts/${post._id}`,{
        data:{username:user.username},
      });
      window.location.replace("/");
     }catch(err){}
  }

  const handleUpdate=async()=>{
    try{
      await axios.put(`/posts/${post._id}`,{
      username:user.username,title,desc,
      });
      
      setUpdatedMode(false);
     }catch(err){}
  }

  return (
    <div className='singlePost'>
        <div className="singlePostWrapper">
          {post.photo && (
          <img src={PF +post.photo}
          alt="" className="singlePostImg" />
          
          )}{
            updateMode ? <input type="text" value={title} className='singlePostTitleInput' 
            autoFocus
            onChange={(e)=>setTitle(e.target.value)}
            /> : (

              <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username && 
              <div className="singlePostEdit">
              <i className=" singlePostIcon fa-regular fa-pen-to-square"
              
              onClick={()=>setUpdatedMode(true)}
              ></i>
              <i className=" singlePostIcon fa-regular fa-trash-can" 
              onClick={handleDelete}
              
              ></i>
              </div>
              
              }
           
            </h1>

            )
          }
            
       


        <div className="singlePostInfo">
        <span className='singlePostAuthor'>Author : 
          <Link to={`/?user=${post.username}`} className='link'>
          <b>{post.username}</b></Link>
          
          </span>
        <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
   

      

        </div>
        {
          updateMode ? <textarea className='singlePostDescInput' value={desc}
          
          onChange={(e)=>setDesc(e.target.value)}
          
          /> : (
            <p className='singlePostDesc'>{desc}</p>
          )
        }

        {
          updateMode && <button className="singlPostButton" 
        
          onClick={handleUpdate}>Update</button>
        }
        

        </div>
       
    </div>
  )
}

export default SinglePost