import React from 'react'

const IconForComment = ({ xposition, yposition, noteId, iconClose, handleCommentEvent }) => {
  return <div style={{ top: yposition - 35, left: xposition, position: 'absolute', zIndex: 2 }} id={noteId}
  >
    <svg width="40" height="25" onClick={(e) => handleCommentEvent(e)}>
      <rect rx={10} ry={30} width={40} height={25} style={{ fill: 'yellow', stroke: 'black', strokeWidth: '1' }}>I</rect>
    </svg>
  </div>
}

export default IconForComment
