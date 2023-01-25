import React from 'react'
import './component.css'


const Profile = () => {
  return (
    <div>
      <div className="profile-card">
        <div className="profile-card-header">
          <div className="profile-image">
            <img className='profileimage' src="https://yt3.ggpht.com/ytc/AKedOLSB-oR-xmvVSZXJ3gbK12uvv0AJUvajwxMie_R_uw=s900-c-k-c0x00ffffff-no-rj" alt="" />
          </div>

          <div className="profile-info">
            <h3 className="profile-name">Shibdas Kumbhakar</h3>
            <p className="profile-desc">Developer/Conent Creator</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile