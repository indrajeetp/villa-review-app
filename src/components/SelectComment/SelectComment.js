import React, { useState } from 'react'
import './style.css'
const SelectComment = ({ xposition, yposition, noteId, isClose, showButton }) => {
  const createId = () => {
    const id = noteId
    if (id.indexOf('_comments') > 0) {
      return id.replace('_comments', '_commentsNotes')
    }
    return null
  }
  const [notesComment, setNotesComment] = useState(localStorage.getItem(createId()) || null)
  const saveComment = () => {
    if (notesComment) {
      localStorage.setItem(`${noteId}_commentsNotes`, notesComment)
      isClose()
    }
  }

  const handleOnChange = (e) => {
    if (e.target.value) {
      setNotesComment(e.target.value)
    }
  }
  return (
    <div className="card border-dark mb-3 modalDiv" style={{ top: yposition + 15, left: xposition }} id={`${noteId}_modal`}>
      <div className="card-header"><span className="float-right" aria-hidden="true" onClick={isClose}>
        {showButton ? null : <button type="submit" className="btn btn-sm" onClick={isClose}>X</button>}
      </span></div>
      <div className="modal-padding">
        <div className="form-group">
          <textarea className="form-control" value={notesComment || ''} id={`${noteId}_commentSection`} placeholder="Enter Comments" onChange={(e) => handleOnChange(e)} />
        </div>
        {showButton ? <div className="row">
          <div className="col center">
            <button type="submit" className="btn btn-primary btn-sm" onClick={() => saveComment()}>Save</button>
          </div>
        </div> : null}
      </div>
    </div>
  )
}
export default SelectComment
