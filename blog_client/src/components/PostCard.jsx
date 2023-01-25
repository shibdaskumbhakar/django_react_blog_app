import React from 'react'
import { convertDateFromTimeStamp } from '../utils'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ data, setEditPost, deletePostHandle }) => {

  const navigate = useNavigate()

  return (
    <div class="prod-grid">
      <img
        src={data.image}
        alt="kalita" />
      <h3>{data.title}</h3>
      <p className='post_description'>{data.text}</p>
      <div>

        <a className="article-action view-btn" onClick={() => navigate(`/post-details/${data.slug}`)}>View</a>
        <a className="article-action edit-btn" onClick={() => setEditPost(data)}>Edit</a>
        <a className="article-action delete-btn" onClick={() => deletePostHandle(data.slug)}>Delete</a>
      </div>

    </div>


  )
}

export default PostCard