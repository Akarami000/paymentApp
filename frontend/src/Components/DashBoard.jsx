import React from 'react';

const DashBoard = () => {
  // Dummy user data
  const users = [
    { id: 1, name: 'John Doe', amountPaid: '$150' },
    { id: 2, name: 'Jane Smith', amountPaid: '$200' },
    { id: 3, name: 'Alice Johnson', amountPaid: '$50' },
    { id: 4, name: 'Bob Brown', amountPaid: '$120' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-3xl font-semibold text-gray-800 mb-6">
        <label>Payment APP</label>
      </div>
      <div className="text-lg text-gray-700 mb-4">
        <span>Your Balance: </span>
        <span className="font-bold text-green-500">$1000</span>
      </div>
      <div className="text-xl text-gray-700 mb-4">
        <label className="font-semibold">User</label>
      </div>
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Payment History"
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Pay
        </button>
      </div>

      {/* Displaying list of users */}
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Users Who Paid</h2>
        <ul className="space-y-4">
          {users.map(user => (
            <li key={user.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">{user.name}</span>
                <span className="text-green-500">{user.amountPaid}</span>
              </div>
              <div className="text-gray-600">User: I have paid</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;