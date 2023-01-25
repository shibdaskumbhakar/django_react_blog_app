import React from 'react'

const EditPost = (props) => {
  return (
    <div>
      <form className="add_new_post" onSubmit={(e) => props.formSubmitEditHandle(e)}>
        <h2>Add New Blog Post</h2>
        <div className='add_blog_input'>
          <p>Title: </p>
          <textarea name="title" id="" cols="70" rows="3" placeholder='Enter Title' onChange={(e) => props.fromFillHandle(e)} value={props.data.title} ></textarea>
        </div>

        <div className='add_blog_input'>
          <p>Desc: </p>
          <textarea name="text" id="" cols="70" rows="12" placeholder='Enter Description' onChange={(e) => props.fromFillHandle(e)} value={props.data.text}></textarea>
        </div>
        <div className='add_blog_input'>
        <input type="file" placeholder="Image" name="image" onChange={(e) => props.fromFillHandle(e)} />
        </div>
          

        <input type="submit" className='save_post_btn' value="Save Post" />
      </form>
    </div>
  )
}

export default EditPost