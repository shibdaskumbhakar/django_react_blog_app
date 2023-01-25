import React, { useEffect, useState } from 'react'
import './pages.css'
import { getSinglePost } from '../actions'
import { useParams } from 'react-router-dom';
import { convertDateFromTimeStamp } from '../utils';

const PostDetails = () => {

  const [post, setPost] = useState(null)

  let { slug } = useParams()

  const fetchSinglePsot = async () => {
    try {
      const res = await getSinglePost(slug)
      setPost(res.data)
    } catch (err) {
      alert("something went wrong")
    }
  }

  useEffect(() => {
    fetchSinglePsot()
  }, [])


  return (
    <div className='post-details'>
      <div className="container">
        {post && (
          <div>
            <article className="article-details">
              <h2 className="article-detail-title">{post.title}</h2>
              <img src={post.image} alt="simple white desk on a white wall with a plant on the far right side" className="article-detail-image" />
              <p className="article-detail-info">Published At:- {convertDateFromTimeStamp(post.created_at)}, 2019 By @{post.user.username}</p>
              <p className="article-detail-body">{post.text}
              </p>
            </article>
          </div>
        )}

      </div>
    </div>
  )
}

export default PostDetails


