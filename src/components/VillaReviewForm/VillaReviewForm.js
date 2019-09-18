import React from 'react'

class VillaReviewForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      villaName: '',
      dateOfVisit: '',
      pincode: '',
      ownerName: '',
      surroundingArea: '',
      construction: '',
      villaDecor: '',
      isSubmitted: false
    }
  }

  resetFields () {
    this.setState({
      villaName: '',
      dateOfVisit: '',
      pincode: '',
      ownerName: '',
      surroundingArea: '',
      construction: '',
      villaDecor: '',
      isSubmitted: false
    })
  }

  handleOnChange (event) {
    const pincodePattern = /^(0|[1-9][0-9]*)$/
    if (event.target.name === 'pincode' && event.target.value && !pincodePattern.test(event.target.value)) {
      event.preventDefault()
    } else { this.setState({ [event.target.name]: event.target.value }) }
  }

  validateForm () {
    this.setState({
      isSubmitted: true
    })
    if (this.state.villaName && this.state.dateOfVisit && this.state.pincode && this.state.surroundingArea && this.state.construction && this.state.villaDecor) { return true }
    return false
  }

  handleOnClick () {
    if (this.validateForm()) {
      localStorage.setItem('VistorsReview', JSON.stringify(this.state))
      window.location.reload()
    }
  }

  render () {
    return (
      <div className='container'>
        <h3>Villa Review Form</h3>
        <div className="form-group">
          <label htmlFor="inputVillaName">Name of Villa*</label>
          <input type="text" className={`form-control ${this.state.isSubmitted && !this.state.villaName ? 'is-invalid' : ''}`} name='villaName' id="inputVillaName" placeholder="Name of Villa" value={this.state.villaName} onChange={(e) => this.handleOnChange(e)} />
          <div className="invalid-feedback">
                        Required Field*
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputDate">Date of Visit*</label>
            <input type="date" className={`form-control ${this.state.isSubmitted && !this.state.dateOfVisit ? 'is-invalid' : ''}`} id="inputDate" name='dateOfVisit' placeholder="dd/mm/yyyy" value={this.state.dateOfVisit} onKeyPress={(e) => e.preventDefault()} onChange={(e) => this.handleOnChange(e)} />
            <div className="invalid-feedback">
                            Required Field*
            </div>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPincode">Pincode</label>
            <input type="text" className={`form-control ${this.state.isSubmitted && this.state.pincode.length < 6 ? 'is-invalid' : ''}`}
              id="inputPincode" name='pincode' placeholder="Pincode" maxLength={6} value={this.state.pincode}
              onChange={(e) => this.handleOnChange(e)} />
            <div className="invalid-feedback">
              {!this.state.pincode ? 'Required Field*' : 'Enter Valid Pincode'}
            </div>
          </div>

        </div>
        <div className="form-group">
          <label htmlFor="inputOwner">Owner&apos; name</label>
          <input type="text" className="form-control" id="inputOwner" placeholder="Owner&apos; name" name='ownerName' value={this.state.ownerName} onChange={(e) => this.handleOnChange(e)} />
        </div>
        <div className="form-group">
          <label htmlFor="inputSurrounding">A note about the surrounding area of the villa*</label>
          <textarea className={`form-control ${this.state.isSubmitted && !this.state.surroundingArea ? 'is-invalid' : ''}`} id="inputSurrounding" placeholder="About the surrounding" name='surroundingArea' value={this.state.surroundingArea} onChange={(e) => this.handleOnChange(e)} />
          <div className="invalid-feedback">
                        Required Field*
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputConstn">A note about the construction quality of the villa*</label>
          <textarea className={`form-control ${this.state.isSubmitted && !this.state.construction ? 'is-invalid' : ''}`} id="inputConstn" placeholder="About the construction" name='construction' value={this.state.construction} onChange={(e) => this.handleOnChange(e)} />
          <div className="invalid-feedback">
                        Required Field*
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputDecor">A note about the villa decor*</label>
          <textarea className={`form-control ${this.state.isSubmitted && !this.state.villaDecor ? 'is-invalid' : ''}`} id="inputDecor" placeholder="About villa decor" name='villaDecor' value={this.state.villaDecor} onChange={(e) => this.handleOnChange(e)} />
          <div className="invalid-feedback">
                        Required Field*
          </div>
        </div>

        <button type="button" className="btn btn-primary" onClick={() => this.handleOnClick()}>Submit</button>
        <button type="button" className="btn" onClick={() => this.resetFields()}>Cancel</button>
      </div>
    )
  }
}

export default VillaReviewForm
