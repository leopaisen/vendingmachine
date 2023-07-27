import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import AddVendingMachine from './components/AddVendingMachine';
import VendingMachineList from './components/VendingMachineList';

const App = () => {
  const [vendingMachines, setVendingMachines] = useState([]);

  // 自動販売機の位置情報を取得する関数
  const fetchVendingMachines = async () => {
    try {
      const response = await fetch('/api/vending-machines');
      const data = await response.json();
      setVendingMachines(data);
    } catch (error) {
      console.log('Error fetching vending machines:', error);
    }
  };

  // 初回レンダリング時に自動販売機の位置情報を取得します
  useEffect(() => {
    fetchVendingMachines();
  }, []);

  return (
    <div>
      <h1>じはんきさがせ</h1>
      <AddVendingMachine fetchVendingMachines={fetchVendingMachines} />
      <Map vendingMachines={vendingMachines} />
      <VendingMachineList vendingMachines={vendingMachines} />
    </div>
  );
};

export default App;
