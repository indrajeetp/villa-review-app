import React from 'react'
import ReviewComment from '../ReviewComment'
import VillaReviewForm from '../VillaReviewForm'

const ManageReview = () => {
  const visitorsReview = localStorage.getItem('VistorsReview')
  if (visitorsReview) {
    return <ReviewComment />
  }
  return <VillaReviewForm />
}
export default ManageReview
