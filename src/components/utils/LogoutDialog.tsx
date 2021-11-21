import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import AuthenticationService from '../../services/AuthenticationService';

interface Props {
  visible: boolean;
  setVisible(val: boolean): void;
}

const LogoutDialog = (props: Props) => {
  const navigate = useNavigate();

  const authenticationService = new AuthenticationService();

  const onHide = () => {
    props.setVisible(false);
  };

  const actionLogout = () => {
    authenticationService.logout();
    onHide();
    navigate('/login');
  };

  return (
    <Dialog
      header="Logout"
      visible={props.visible}
      modal={true}
      onHide={() => onHide()}
      style={{ width: '500px' }}
    >
      <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col-12">
          <i className="pi pi-exclamation-triangle p-mr-3"></i>
          <span>Are you sure you want to log out?</span>
        </div>

        <div className="p-field p-col-12 p-md-3">
          <Button
            label="Yes"
            onClick={actionLogout}
            className="p-button-primary"
            icon="pi pi-check"
          />
        </div>
      </div>
    </Dialog>
  );
};

export default LogoutDialog;
