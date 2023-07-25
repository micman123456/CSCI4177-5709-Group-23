import React from 'react';

const Modal = ({ show, onClose, onSubmit, children }) => {
  if (!show) return null;
  

  return (
    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', background:'rgb(0 0 0 / 52%)',color:'#242d37' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header" style={{background:'#97c9ec'}}>
            <h5 className="modal-title">Add a Task</h5>
          </div>
          <div className="modal-body">
            {/* Display the content passed as children */}
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" style={{color:'#242d37', background:'#f55', borderColor:'#f55'}} onClick={onClose}>
              Close
            </button>
            {/* Add a button to submit the form */}
            <button type="button" className="btn btn-primary" style={{color:'#242d37', background:'#97c9ec', borderColor:'#97c9ec'}}onClick={onSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
