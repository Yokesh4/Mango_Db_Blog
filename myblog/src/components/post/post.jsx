import './post.css';
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const PF = "http://localhost:5000/images/";

  return (
    <div className="post">
      {post.photo && (
        <img className="postImg" src={PF + post.photo} alt='' />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat" key={c.id}>{c.name}</span>  // Add key prop for lists
          ))}
        </div>
        <Link to={`/post/${post._id}`} className='link'>
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
};

export default Post;
