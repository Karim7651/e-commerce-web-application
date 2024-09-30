"use client";

import SignUpLoginTab from "./SignUpLoginTab";
import { useUser } from "../_contexts/userContext";
import Loading from "./Loading";
function CredentialsModal() {
  const { loading } = useUser();
  return (
    <div>
      <button
        className="btn btn-outline btn-sm ml-3"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        {loading ? (
          <span className="flex items-center">
            <Loading className="mr-2" />
            
          </span>
        ) : (
          "Account"
        )}
      </button>
      <dialog id="my_modal_2" className="modal modal-bottom lg:modal-middle ">
        <div className="modal-box !rounded-md">
          <SignUpLoginTab />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default CredentialsModal;
