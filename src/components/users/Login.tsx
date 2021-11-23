/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

import CreateUser from './CreateUser';

import { ILogin } from '../../interfaces/all';
import AuthenticationService from '../../services/AuthenticationService';
import UserService from '../../services/UserService';
import Messages from '../../utils/Messages';
import StringUtils from '../../utils/StringUtils';

const Login = () => {
  const [login, setLogin] = useState<ILogin>({
    email: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [spinLoader, setSpinLoader] = useState(false);
  const [visibleCreateUser, setVisibleCreateUser] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const authenticationService = new AuthenticationService();
  const userService = new UserService();

  const openCreateUser = () => {
    setVisibleCreateUser(true);
  };

  const actionLogin = () => {
    if (validLogin()) {
      setSpinLoader(true);
      userService
        .login(login)
        .then((res) => {
          authenticationService.setUser(res.data);
          navigate('/musics');
        })
        .catch((err: AxiosError) => {
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: err.response.data.message,
          });
          setSubmitted(false);
          setSpinLoader(false);
        });
    } else {
      setSubmitted(true);
    }
  };

  const validLogin = (): boolean => {
    const allRequiredFields = Boolean(login.email && login.password);
    if (!allRequiredFields) {
      return false;
    }

    if (!StringUtils.validEmail(login.email)) {
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
      <div className="container">
        <div className="box">
          <h1>Login</h1>

          <div className="p-fluid p-formgrid p-grid">
            <div
              className="p-field p-col-11"
              style={{ marginLeft: '1rem', marginTop: '1rem' }}
            >
              <label htmlFor="email" className="p-d-block">
                E-mail
              </label>
              <InputText
                id="email"
                value={login.email}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
                autoFocus={true}
                aria-describedby="email-help"
                className={
                  submitted && !login.email ? 'p-invalid p-d-block' : ''
                }
              />
              {submitted && !login.email && (
                <small id="email-help" className="p-error p-d-block">
                  E-mail is required!
                </small>
              )}
            </div>

            <div className="p-field p-col-11" style={{ marginLeft: '1rem' }}>
              <label htmlFor="password" className="p-d-block">
                Password
              </label>
              <Password
                id="password"
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
                feedback={false}
                toggleMask={true}
                aria-describedby="password-help"
                className={
                  submitted && !login.password ? 'p-invalid p-d-block' : ''
                }
              />
              {submitted && !login.password && (
                <small id="password-help" className="p-error p-d-block">
                  Password is required!
                </small>
              )}
            </div>

            <div className="p-field p-col-11" style={{ marginLeft: '1rem' }}>
              <a href="#" onClick={openCreateUser} className="link">
                Don't have a user yet?
              </a>
            </div>

            <div
              className="p-field p-col-4 p-md-4"
              style={{ marginLeft: '1rem' }}
            >
              <Button
                label="Login"
                onClick={actionLogin}
                disabled={spinLoader}
                className="p-button-primary"
                icon="pi pi-sign-in"
                iconPos="right"
              />
            </div>

            <div className="p-field p-col-12 p-md-3">
              {spinLoader && <div className="spin-loader"></div>}
            </div>
          </div>
        </div>
      </div>
      <CreateUser
        visible={visibleCreateUser}
        setVisible={setVisibleCreateUser}
      />
    </>
  );
};

export default Login;
