import React from 'react';

const CoursesModal = ({ children, open, close }) => {
  if (!open) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)'}} onClick={close}>
      <div className="d-flex align-items-center justify-content-center modal-dialog modal-dialog-centered" onClick={() => close}>
        <div className="modal-content p-4 vw-100 rounded-lg">
          <div className="d-flex justify-content-end">
            <button className="btn-close" onClick={close}/>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesModal;
