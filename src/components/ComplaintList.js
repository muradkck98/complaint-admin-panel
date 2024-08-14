// components/ComplaintList.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComplaintRequest } from '../redux/actions';

const ComplaintList = ({ complaints }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      dispatch(deleteComplaintRequest(id));
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Complaint List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Complaint</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Latitude</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Longitude</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Photo</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => {
            const photoUrl = `http://localhost:9000/${complaint.photo}`;
            return (
              <tr key={complaint.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{complaint.Complaint}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{complaint.location.lat}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{complaint.location.lon}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {complaint.photo ? (
                    <img
                      src={photoUrl}
                      alt="Complaint"
                      style={{ width: '100px', height: 'auto' }}
                    />
                  ) : (
                    <p>No photo available</p>
                  )}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button
                    onClick={() => handleDelete(complaint.id)}
                    style={{ background: 'red', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintList;
