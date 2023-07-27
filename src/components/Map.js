import React from 'react';
import GoogleMapReact from 'google-map-react';

const Map = ({ vendingMachines }) => {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAZU3ZmLIukJCl_5Wx2vXRnI-DvMbH9tL8' }}
        defaultCenter={{ lat: 35.681236, lng: 139.767125 }} // 東京駅の座標
        defaultZoom={14}
      >
        {vendingMachines.map((machine) => (
          <Marker
            key={machine._id}
            lat={machine.latitude}
            lng={machine.longitude}
            text={machine.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

const Marker = ({ text }) => (
  <div style={{ color: 'red', fontWeight: 'bold' }}>{text}</div>
);

export default Map;
