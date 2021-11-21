import React, { useRef, useState } from 'react';
import { AxiosError } from 'axios';

import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { IMusic } from '../../interfaces/all';
import MusicService from '../../services/MusicService';
import Messages from '../../utils/Messages';

interface Props {
  music: IMusic;
  onSuccess(): void;
  visible: boolean;
  setVisible(val: boolean): void;
}

const DefinitiveDeleteMusic = (props: Props) => {
  const [spinLoader, setSpinLoader] = useState(false);
  const toast = useRef(null);

  const musicService = new MusicService();

  const onHide = () => {
    props.setVisible(false);
  };

  const actionDefinitiveDelete = () => {
    setSpinLoader(true);
    musicService
      .definitiveDelete(props.music.id)
      .then(() => {
        toast.current.show({
          severity: 'success',
          summary: 'Successfully',
          detail: Messages.MUSIC_DEFINITELY_DELETED_SUCCESSFULLY,
        });
        props.onSuccess();
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
        setSpinLoader(false);
      });
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Definitive Delete Music"
        visible={props.visible}
        modal={true}
        onHide={() => onHide()}
        style={{ width: '500px' }}
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12">
            <i className="pi pi-exclamation-triangle p-mr-3"></i>
            <span>
              Are you sure you want to definitely delete music{' '}
              <b>
                {props.music.artist} - {props.music.title}
              </b>
              ?
            </span>
          </div>

          <div className="p-field p-col-12 p-md-3">
            <Button
              label="Yes"
              onClick={actionDefinitiveDelete}
              disabled={spinLoader}
              className="p-button-primary"
              icon="pi pi-check"
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

export default DefinitiveDeleteMusic;
