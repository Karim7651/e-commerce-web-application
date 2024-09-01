'use client'

import SignUpLoginTab from "./SignUpLoginTab";

function Modal() {
  return (
    <div>
      <button
        className="btn btn-outline btn-sm ml-4"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Login
      </button>
      <dialog id="my_modal_2" className="modal modal-bottom lg:modal-middle">
        <div className="modal-box">
          <SignUpLoginTab/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Modal;
