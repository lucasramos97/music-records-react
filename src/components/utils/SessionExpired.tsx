import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Dialog } from 'primereact/dialog';

import AuthenticationService from '../../services/AuthenticationService';

interface Props {
  visible: boolean;
  setVisible(val: boolean): void;
}

const SessionExpired = (props: Props) => {
  const authenticationService = new AuthenticationService();
  const navigate = useNavigate();

  const onShow = () => {
    authenticationService.logout();
  };

  const onHide = () => {
    props.setVisible(false);
    navigate('/login');
  };

  return (
    <Dialog
      header="Session Expired"
      visible={props.visible}
      modal={true}
      onShow={() => onShow()}
      onHide={() => onHide()}
      style={{ width: '450px' }}
    >
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col-12">
          <i className="pi pi-exclamation-triangle p-mr-3"></i>
          <span>Your session has expired, login again!</span>
        </div>
      </div>
    </Dialog>
  );
};

export default SessionExpired;
