import React, { useEffect, useState } from 'react'
import './pages.css'
import Sidebar from '../components/Sidebar'
import Profile from '../components/Profile'
import PostCard from '../components/PostCard'
import AddNewPost from '../components/AddNewPost'
import { createNewPost, ownerPosts, updatePost, deletePost } from '../actions'
import EditPost from '../components/EditPost'
import Pagination from '../components/Pagination'

const Dashboard = () => {

  const [activeTab, setActiveTab] = useState('all_post')

  const [newPostData, setNewPostData] = useState(null)
  const [error, setError] = useState(null)
  const [ownPost, setOwnPost] = useState(null)
  const [editPost, setEditPost] = useState({})

  const fromFillHandle = (e) => {
    if (e.target.files) {
      setNewPostData({ ...newPostData, [e.target.name]: e.target.files[0] })
    } else {
      setNewPostData({ ...newPostData, [e.target.name]: e.target.value })
    }

  }

  const fromEDitFillHandle = (e) => {
    if (e.target.files) {
      setEditPost({ ...editPost, [e.target.name]: e.target.files[0] })
    } else {
      setEditPost({ ...editPost, [e.target.name]: e.target.value })
    }

  }

  const getOwnerPost = async (page_no=1) => {
    try {
      const res = await ownerPosts(page_no)
      setOwnPost(res.data)
    } catch (err) {

    }
  }

  useEffect(() => {
    getOwnerPost()
  }, [])

  useEffect(() => {
    console.log(editPost, '-------------------------------')
    if ('slug' in editPost) {
      setActiveTab("edit_post")
    }

  }, [editPost])

  const formSubmitHandle = async (event) => {
    event.preventDefault();
    if ('title' in newPostData && 'text' in newPostData && 'image' in newPostData) {
      setError(null)
      try {
        let formData = new FormData();
        formData.append("title", newPostData['title']);
        formData.append("text", newPostData['text']);
        formData.append("image", newPostData['image']);

        const res = await createNewPost(formData)
        getOwnerPost()
        setActiveTab("all_post")

      } catch (err) {
        setError(err.response.data.message)
      }
    } else {
      setError("username and password both required")
    }
  }

  const formSubmitEditHandle = async (event) => {
    event.preventDefault();
    if ('title' in editPost && 'text' in editPost && 'image' in editPost) {
      setError(null)
      try {
        let formData = new FormData();
        formData.append("title", editPost['title']);
        formData.append("text", editPost['text']);
        formData.append("image", editPost['image']);

        const res = await updatePost(formData, editPost.slug)
        getOwnerPost()
        setActiveTab("all_post")

      } catch (err) {
        setError(err.response.data.message)
      }
    } else {
      setError("3 fileds both required")
    }
  }

  const deletePostHandle = async (slug) => {
    try {
      const res = await deletePost(slug)
      getOwnerPost()
    } catch (err) {
      console.log(err)
    }
  }

  const handlePagination = async (page_no) =>{
    getOwnerPost(page_no)
  }



  return (
    <div className='dashbaord'>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'profile' && (
        <Profile />
      )}
  
      {activeTab === 'all_post' && (
        <div class="container">
        <div id="div1">
          <section class="section-grid">
            <div class="grid-prod">
            {ownPost !== null && ownPost.results.map((item, index) => {
              return (
                  <PostCard data={item} setEditPost={setEditPost} deletePostHandle={deletePostHandle}/>
              )
            })}

            </div>
          </section>
        </div>
        {ownPost !== null && (
            <Pagination data={ownPost} handlePagination={handlePagination}/>
        )}
      </div>
      )}



      {activeTab === 'add_post' && (
        <div className='dashboard_post_list container'>
          <AddNewPost formSubmitHandle={formSubmitHandle} fromFillHandle={fromFillHandle} newPostData={newPostData} />
        </div>
      )}

      {activeTab === 'edit_post' && (
        <div className='dashboard_post_list container'>
          <EditPost formSubmitEditHandle={formSubmitEditHandle} fromFillHandle={fromEDitFillHandle} data={editPost} />
        </div>
      )}

    </div>
  )
}

export default Dashboard


