/* eslint-disable react/prop-types */

function PopupModal({ children, open }) {
  return (
    open && (
      <div className="bg-gray-200">
        <div id="modal-container" className="fixed inset-0 z-40 flex justify-center items-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          {children}
        </div>
      </div>
    )
  );
}

export default PopupModal;
