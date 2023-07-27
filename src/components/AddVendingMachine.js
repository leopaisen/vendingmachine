import React, { useState } from 'react';

const AddVendingMachine = ({ fetchVendingMachines }) => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch('/api/vending-machines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, latitude, longitude }),
      });
      fetchVendingMachines();
      setName('');
      setLatitude('');
      setLongitude('');
    } catch (error) {
      console.log('Error adding vending machine:', error);
    }
  };

  return (
    <div>
      <h2>自動販売機の位置を追加する</h2>
      <form onSubmit={handleSubmit}>
        <label>
          名前:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          緯度:
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
        <label>
          経度:
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
        <button type="submit">追加</button>
      </form>
    </div>
  );
};

export default AddVendingMachine;
