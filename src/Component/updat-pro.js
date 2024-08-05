import React, { useState, useCallback } from 'react';
import avatar1 from '../Avatar/avatar1.png';
import avatar2 from '../Avatar/avatar2.png';
import avatar3 from '../Avatar/avatar3.png';
import avatar4 from '../Avatar/avatar4.png';
import avatar5 from '../Avatar/avatar5.png';
import avatar6 from '../Avatar/avatar6.png';
import './ProfilUpdate.css';

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
];

const ProfileUpdate = () => {
  const [profile, setProfile] = useState({
    UserID:1,
    UserName: '',
    Email: '',
    Phone: '',
    Password: '',
    Birthday: '',
    AvatarUrl: avatars[0],
  });

  const [errors, setErrors] = useState({});
  const [updateStatus, setUpdateStatus] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleAvatarChange = useCallback((avatar) => {
    setProfile((prevState) => ({
      ...prevState,
      avatar,
    }));
  }, []);

  const validateForm = () => {
    console.log(profile);
    const newErrors = {};
    if (!profile.UserName) newErrors.UserName = 'Name is required';
    if (!profile.Email) newErrors.Email = 'Email is required';
    if (!profile.Password || profile.Password.length < 8) {
      newErrors.Password = 'Password must be at least 8 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateProfile = async () => {
    try {
      const response = await fetch('http://localhost:5555/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        setUpdateStatus('Profile updated successfully');
      } else {
        const errorData = await response.json();
        setUpdateStatus(`Failed to update profile: ${errorData.message}`);
      }
    } catch (error) {
      setUpdateStatus(`Error: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      updateProfile();
    }
  };

  return (
    <div className="profile-update">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="UserName"
            value={profile.name}
            onChange={handleChange}
            required
            aria-describedby="nameError"
          />
          {errors.name && <div id="nameError" className="error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="Email"
            value={profile.email}
            onChange={handleChange}
            required
            aria-describedby="emailError"
          />
          {errors.email && <div id="emailError" className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="Phone"
            value={profile.phone}
            onChange={handleChange}
            pattern="05[0-9]-[0-9]{7}"
            title="Format: 05X-XXXXXXX"
            placeholder="05X-XXXXXXX"
            aria-describedby="phoneError"
          />
          {errors.phone && <div id="phoneError" className="error">{errors.phone}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="Password"
            value={profile.password}
            onChange={handleChange}
            required
            minLength="8"
            title="Password must be at least 8 characters"
            aria-describedby="passwordError"
          />
          {errors.password && <div id="passwordError" className="error">{errors.password}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            name="Birthday"
            value={profile.birthday}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <h4>Avatar:</h4>
          <div className="avatar-selection">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className={`avatar ${profile.avatar === avatar ? 'selected' : ''}`}
                style={{ cursor: 'pointer', width: 50, height: 50, margin: 5 }}
                onClick={() => handleAvatarChange(avatar)}
              />
            ))}
          </div>
        </div>
        <button type="submit">Update Profile</button>
        {updateStatus && <div className="update-status">{updateStatus}</div>}
      </form>
    </div>
  );
};

export default ProfileUpdate;
