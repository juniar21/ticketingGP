import CreateOrderForm from '@/app/components/order/orderForm';
import React, { useState } from 'react';

interface Ticket {
    id: number;
    category: string;
    price: number;
    quota: number;
}

const TicketSelection = ({ selectedTicket }: { selectedTicket: Ticket }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      {selectedTicket && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold">
            Pilihan Tiket: {selectedTicket.category}
          </h3>
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2 cursor-pointer"
          >
            Proceed
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold">Order Ticket</h3>
            <CreateOrderForm ticket={selectedTicket} />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketSelection;
