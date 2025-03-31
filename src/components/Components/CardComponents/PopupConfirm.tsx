// components/ConfirmationModal.tsx
import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[350px] text-center">
        <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-8">
          <button
            onClick={onClose} // Close the modal without action
            className="px-4 py-2 bg-gray-300 text-black rounded-lg"
          >
            No
          </button>
          <button
            onClick={onConfirm} // Confirm the action
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
