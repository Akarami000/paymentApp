import React from 'react';

const SendMoney = () => {
  return (
<div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">      {/* Modal with white background */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        {/* Modal content */}
        <label className="block text-2xl font-semibold text-gray-800 mb-4">
          Send Money
        </label>
        <img
          src="https://gallerymurciano.com/wp-content/uploads/2024/03/Young-Goku.jpg"
          alt="Payee"
          className="w-16 h-16 rounded-full mx-auto mb-4"
        />
        <h2 className="text-lg font-medium text-gray-700 text-center mb-2">
          Payee Name
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4">Amount (in Rs)</p>
        <input
          type="text"
          placeholder="Amount to be paid"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button className="w-full bg-green-500 text-white py-2 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Send Money
        </button>
      </div>
    </div>
  );
};

export default SendMoney;