import React, { useState } from 'react'
import SelectComment from '../SelectComment'
import IconForComment from '../IconForComment/IconForComment'

const ReviewComment = () => {
  const vistorsReview = JSON.parse(localStorage.getItem('VistorsReview'))
  const [selectedSurroundingArea, setSelectedSurroundingArea] = useState(localStorage.getItem('p_surroundingArea'))
  const [selectedConstruction, setselectedConstruction] = useState(localStorage.getItem('p_construction'))
  const [selectedVillaDecor, setselectedVillaDecor] = useState(localStorage.getItem('p_villaDecor'))
  const [loadModal, setLoadModal] = useState(false)
  const [xposition, setxposition] = useState(0)
  const [yposition, setyposition] = useState(0)
  const [noteId, setnoteId] = useState()
  const [showButton, setShowBotton] = useState(false)
  const [loadCommentIcon, setLoadCommentIcon] = useState(false)

  const handleMouseEvent = (e) => {
    const selectedText = window.getSelection()
    if (selectedText.toString()) {
      manageNotes(selectedText.toString(), e.target.id)
      setxposition(e.clientX)
      setyposition(e.clientY)
      setnoteId(e.target.id)
      if (e.target.id) {
        setLoadCommentIcon(true)
      }
    }
  }

  const handleOnClick = (e) => {
    if (loadModal) { setLoadModal(false) }
    setxposition(e.clientX)
    setyposition(e.clientY)
    setnoteId(e.target.id)
    setShowBotton(false)
    setLoadModal(true)
    e.stopPropagation()
  }

  const handleClose = () => {
    setLoadModal(false)
  }

  const manageNotes = (selectedText, id) => {
    if (id && !localStorage.getItem(id)) {
      if (id === 'p_surroundingArea') {
        localStorage.setItem(id, selectedText)
        setSelectedSurroundingArea(selectedText)
      }
      if (id === 'p_construction') {
        localStorage.setItem(id, selectedText)
        setselectedConstruction(selectedText)
      }
      if (id === 'p_villaDecor') {
        localStorage.setItem(id, selectedText)
        setselectedVillaDecor(selectedText)
      }
    }
  }

  const handleCommentEvent = (e) => {
    setLoadCommentIcon(false)
    setShowBotton(true)
    setLoadModal(true)
    e.stopPropagation()
  }

  const clearAll = () => {
    localStorage.clear()
    window.location.reload()
  }
  const renderStyledNote = (id) => {
    const fetchSelectedText = localStorage.getItem(id)
    let getNotesArray = []
    switch (id) {
      case 'p_surroundingArea':
        getNotesArray = vistorsReview.surroundingArea.split(fetchSelectedText)
        break
      case 'p_construction':
        getNotesArray = vistorsReview.construction.split(fetchSelectedText)
        break
      case 'p_villaDecor':
        getNotesArray = vistorsReview.villaDecor.split(fetchSelectedText)
        break
      default:
        getNotesArray = []
    }
    if (fetchSelectedText) {
      return (
        <div>{getNotesArray[0]}<span id={id + '_comments'} onMouseUp={(e) => handleOnClick(e)} style={{ backgroundColor: '#ffff99' }}>{fetchSelectedText}</span>{getNotesArray[1]}</div>
      )
    }
    return null
  }
  return (<div className='container'>
    <h4>Visitors Review Comment</h4>
    {loadModal ? <SelectComment noteId={noteId} xposition={xposition} yposition={yposition} isClose={() => handleClose()} showButton={showButton} /> : null}

    {loadCommentIcon ? <IconForComment noteId={noteId} xposition={xposition} yposition={yposition}
      handleCommentEvent={(e) => handleCommentEvent(e)}></IconForComment> : null}

    <label>A note about the surrounding area of the villa</label>
    <div className="card">
      <div className="card-body">
        <div className="card-text" id='p_surroundingArea' onMouseUp={(e) => handleMouseEvent(e)}>{selectedSurroundingArea ? renderStyledNote('p_surroundingArea') : vistorsReview.surroundingArea}</div>
      </div>
    </div>
    <br />
    <label>A note about the construction quality of the villa</label>
    <div className="card">
      <div className="card-body">
        <div className="card-text" id='p_construction' onMouseUp={(e) => handleMouseEvent(e)}>{selectedConstruction ? renderStyledNote('p_construction') : vistorsReview.construction}</div>
      </div>
    </div>
    <br />
    <label>A note about the villa decor</label>
    <div className="card">
      <div className="card-body">
        <div className="card-text" id='p_villaDecor' onMouseUp={(e) => handleMouseEvent(e)}>{selectedVillaDecor ? renderStyledNote('p_villaDecor') : vistorsReview.villaDecor}</div>
      </div>
    </div>
    <div className="card-body">
      <button className='btn btn-secondary' onClick={() => clearAll()}>Clear All</button>
    </div>
  </div>)
}

export default ReviewComment
