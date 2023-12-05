import React from 'react'
import '../styles/info.scss'
import doc from '../tp.jpeg'
export default function Info() {
  return (
    <div className="parent-info">
        <div className="info">
        <div className="img">
            <img src={doc} alt="photo" />
        </div>
        <div className="doc-info">
            <h2 className="name">
                XYZ
            </h2>
            <div className="clinic">
                - Manik Dalvi's Clinic, Kalyan Naka, Rk Business Centre, Opp. Bopal Nagar, Maharashtra, 421302
            </div>
            <div className="fees">
                Rs:500
            </div>
        </div>
        </div>
    </div>
  )
}
