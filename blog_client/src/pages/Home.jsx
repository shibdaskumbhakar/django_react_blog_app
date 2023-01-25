import React, { useEffect, useState } from 'react'
import './pages.css'
import Pagination from '../components/Pagination'
import { getAllPost } from '../actions'
import { convertDateFromTimeStamp } from '../utils'
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const [postData, setPostData] = useState(null)

  const navigate = useNavigate()

  const a = [1, 2, 3, 4, 5]

  const fetchAllPost = async (page_no=1) => {
    try {
      const res = await getAllPost(page_no)
      setPostData(res.data)
    } catch (err) {
      console.log(err, '===============')
    }
  }

  const handlePagination = async (page_no) =>{
    fetchAllPost(page_no)
  }

  useEffect(() => {
    fetchAllPost()
  }, [])

  useEffect(() => {
    console.log(postData)

  }, [postData])

  const seeMoreClickHandle = (slug) => {
    navigate(`/post-details/${slug}`)
  }




  return (
    <div className='home_page'>
      <div className="container">

        <main role="main">
          {postData !== null && postData.page===1 && postData.results && (
            <article className="article-featured">
              <h2 className="article-title">{postData.results[0].title}</h2>
              <img src={postData.results[0].image} alt="simple white desk on a white wall with a plant on the far right side" className="article-image_full" />
              <p className="article-info">{convertDateFromTimeStamp(postData.results[0].created_at)} | @{postData.results[0].user.username}</p>
              <p className="article-body article_description">{postData.results[0].text}</p>
              <p className="article-read-more" onClick={() => seeMoreClickHandle(postData.results[0].slug)}>CONTINUE READING</p>
            </article>
          )}

          {postData !== null && postData.page===1 ? (
            <>
            {postData.results.slice(1).map((item,index) =>{
              return(
                <article className="article-recent" key={index}>
                <div className="article-recent-main">
                  <h2 className="article-title">{item.title}</h2>
                  <p className="article-body article_description_resent">{item.text}</p>
                  <p href="#" className="article-read-more" onClick={() => seeMoreClickHandle(item.slug)}>CONTINUE READING</p>
                </div>
                <div className="article-recent-secondary">
                  <img src={item.image} alt="a chair white chair at a white desk on a white wall" className="article-image" />
                  <p className="article-info">{convertDateFromTimeStamp(item.created_at)} | @{item.user.username}</p>
                </div>
              </article>
              )
            })}
            </>
          ):(
            <>
            {postData !== null && postData.results.map((item,index) =>{
              return(
                <article className="article-recent" key={index}>
                <div className="article-recent-main">
                  <h2 className="article-title">{item.title}</h2>
                  <p className="article-body article_description_resent">{item.text}</p>
                  <p href="#" className="article-read-more" onClick={() => seeMoreClickHandle(item.slug)}>CONTINUE READING</p>
                </div>
                <div className="article-recent-secondary">
                  <img src={item.image} alt="a chair white chair at a white desk on a white wall" className="article-image" />
                  <p className="article-info">{convertDateFromTimeStamp(item.created_at)} | @{item.user.username}</p>
                </div>
              </article>
              )
            })}
            </>
          )}

          {postData !== null && (
            <Pagination data={postData} handlePagination={handlePagination}/>
          )}


        </main>


      </div>
    </div>
  )
}

export default Home