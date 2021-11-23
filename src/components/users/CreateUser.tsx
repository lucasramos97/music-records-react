import React, { useRef, useState } from 'react';
import { AxiosError } from 'axios';

import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import { IUser } from '../../interfaces/all';
import UserService from '../../services/UserService';
import StringUtils from '../../utils/StringUtils';
import Messages from '../../utils/Messages';

interface Props {
  visible: boolean;
  setVisible(val: boolean): void;
}

const CreateUser = (props: Props) => {
  const [user, setUser] = useState<IUser>({
    username: '',
    email: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [spinLoader, setSpinLoader] = useState(false);
  const toast = useRef(null);

  const userService = new UserService();

  const onHide = () => {
    setUser({
      username: '',
      email: '',
      password: '',
    });
    setSubmitted(false);
    setSpinLoader(false);
    props.setVisible(false);
  };

  const actionCreateUser = () => {
    if (validUser()) {
      setSpinLoader(true);
      userService
        .create(user)
        .then(() => {
          toast.current.show({
            severity: 'success',
            summary: 'Successfully',
            detail: Messages.USER_SUCCESSFULLY_CREATE,
          });
          onHide();
        })
        .catch((err: AxiosError) =>
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: err.response.data.message,
          })
        )
        .finally(() => {
          setSubmitted(false);
          setSpinLoader(false);
        });
    } else {
      setSubmitted(true);
    }
  };

  const validUser = (): boolean => {
    const allRequiredFields = Boolean(
      user.username && user.email && user.password
    );
    if (!allRequiredFields) {
      return false;
    }

    if (!StringUtils.validEmail(user.email)) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: Messages.EMAIL_INVALID,
      });
      return false;
    }

    return true;
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Create User"
        visible={props.visible}
        modal={true}
        onHide={() => onHide()}
        style={{ width: '450px' }}
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12">
            <label htmlFor="username" className="p-d-block">
              Username
            </label>
            <InputText
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              autoFocus={true}
              aria-describedby="username-help"
              className={
                submitted && !user.username ? 'p-invalid p-d-block' : ''
              }
            />
            {submitted && !user.username && (
              <small id="username-help" className="p-error p-d-block">
                Username is required!
              </small>
            )}
          </div>

          <div className="p-field p-col-12">
            <label htmlFor="email" className="p-d-block">
              E-mail
            </label>
            <InputText
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              aria-describedby="email-help"
              className={submitted && !user.email ? 'p-invalid p-d-block' : ''}
            />
            {submitted && !user.email && (
              <small id="email-help" className="p-error p-d-block">
                E-mail is required!
              </small>
            )}
          </div>

          <div className="p-field p-col-12">
            <label htmlFor="password" className="p-d-block">
              Password
            </label>
            <Password
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              toggleMask={true}
              aria-describedby="password-help"
              className={
                submitted && !user.password ? 'p-invalid p-d-block' : ''
              }
            />
            {submitted && !user.password && (
              <small id="password-help" className="p-error p-d-block">
                Password is required!
              </small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-3">
            <Button
              label="Save"
              onClick={actionCreateUser}
              disabled={spinLoader}
              className="p-button-success"
              icon="pi pi-save"
            />
          </div>

          <div className="p-field p-col-12 p-md-3">
            {spinLoader && <div className="spin-loader"></div>}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreateUser;
