import React from 'react'

const Sidebar = (props) => {
  return (
    <div>
      <aside className="sidebar">
        <nav>
          <div className="nav_items">
            <a href="#" className={props.activeTab === 'all_post' ? 'active' : ''} onClick={() => props.setActiveTab('all_post')}>All Post</a>
            <a href="#" className={props.activeTab === 'add_post' ? 'active' : ''} onClick={() => props.setActiveTab('add_post')}>Add New Post</a>
            {/* <a href="#" className={props.activeTab === 'edit_post' ? 'active' : ''} onClick={() => props.setActiveTab('edit_post')}>EDit Post</a> */}
          </div>
        </nav>
      </aside>
    </div>
  )
}

export default Sidebar