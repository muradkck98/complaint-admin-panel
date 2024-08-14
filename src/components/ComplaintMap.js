// components/ComplaintMap.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { fetchComplaintsRequest } from '../redux/actions';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS
import L from 'leaflet'; // Leaflet for icon images
import ComplaintList from './ComplaintList';

// Fix for leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;

const ComplaintMap = () => {
  const dispatch = useDispatch();
  const { complaints, loading, error } = useSelector(state => state);

  // Default center coordinates (Istanbul)
  const center = complaints.length > 0
    ? [
        complaints.reduce((acc, complaint) => acc + complaint.location.lat, 0) / complaints.length,
        complaints.reduce((acc, complaint) => acc + complaint.location.lon, 0) / complaints.length
      ]
    : [41.0082, 28.9784];

  const zoom = 12;

  useEffect(() => {
    dispatch(fetchComplaintsRequest());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <MapContainer center={center} zoom={zoom} style={{ height: '50vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {complaints.map(complaint => {
          const { lat, lon } = complaint.location;
          const photoUrl = `http://localhost:9000/${complaint.photo}`;

          return (
            <Marker
              key={complaint.id}
              position={[lat, lon]}
              icon={L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
                shadowSize: [41, 41],
              })}
            >
              <Popup>
                <div>
                  <table>
                    <tbody>
                      <tr>
                        <td><strong>Complaint:</strong></td>
                        <td>{complaint.Complaint}</td>
                      </tr>
                      <tr>
                        <td><strong>Latitude:</strong></td>
                        <td>{lat}</td>
                      </tr>
                      <tr>
                        <td><strong>Longitude:</strong></td>
                        <td>{lon}</td>
                      </tr>
                      <tr>
                        <td><strong>Photo:</strong></td>
                        <td>
                          {complaint.photo ? (
                            <img
                              src={photoUrl}
                              alt="Complaint"
                              style={{ width: '150px', height: 'auto' }}
                            />
                          ) : (
                            <p>No photo available</p>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <ComplaintList complaints={complaints} /> {/* Add the ComplaintList component */}
    </div>
  );
};

export default ComplaintMap;
