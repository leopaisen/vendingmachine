import React from 'react';

const VendingMachineList = ({ vendingMachines }) => {
  return (
    <div>
      <h2>自動販売機の一覧</h2>
      <ul>
        {vendingMachines.map((machine) => (
          <li key={machine._id}>
            {machine.name} ({machine.latitude}, {machine.longitude})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendingMachineList;
