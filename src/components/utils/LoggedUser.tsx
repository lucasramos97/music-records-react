import React, { useEffect, useState } from 'react';

import AuthenticationService from '../../services/AuthenticationService';

const LoggedUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const authenticationService = new AuthenticationService();
    setUsername(authenticationService.getUsername());
    setEmail(authenticationService.getEmail());
  }, []);

  return (
    <div className="user">
      <span className="user-name">{username}</span>
      <span>{email}</span>
    </div>
  );
};

export default LoggedUser;
