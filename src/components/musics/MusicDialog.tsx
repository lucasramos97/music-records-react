import React, { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';

import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';

import { IMusic } from '../../interfaces/all';
import MusicService from '../../services/MusicService';
import DateUtils from '../../utils/DateUtils';
import Messages from '../../utils/Messages';
import MusicFactory from '../../utils/MusicFactory';

interface Props {
  title: string;
  music: IMusic;
  onSuccess(): void;
  visible: boolean;
  setVisible(val: boolean): void;
}

const MusicDialog = (props: Props) => {
  const [music, setMusic] = useState(MusicFactory.createDefaultMusic());
  const [submitted, setSubmitted] = useState(false);
  const [spinLoader, setSpinLoader] = useState(false);
  const toast = useRef(null);

  const musicService = new MusicService();

  useEffect(() => {
    setMusic(props.music);
  }, [props.music]);

  const onHide = () => {
    setSubmitted(false);
    props.setVisible(false);
  };

  const actionSave = () => {
    if (validMusic()) {
      setSpinLoader(true);
      if (music.id) {
        editMusic();
      } else {
        saveMusic();
      }
    } else {
      setSubmitted(true);
    }
  };

  const validMusic = (): boolean => {
    const allRequiredFields = Boolean(
      music.title && music.artist && music.release_date && music.duration
    );

    if (!allRequiredFields) {
      return false;
    }

    const releaseDate = DateUtils.createReleaseDate(music.release_date);
    if (Number.isNaN(releaseDate.getDate())) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: Messages.getInvalidDate(music.release_date),
      });
      return false;
    }

    if (releaseDate > new Date()) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: Messages.RELEASE_DATE_CANNOT_BE_FUTURE,
      });
      return false;
    }

    const duration = DateUtils.createDuration(music.duration);
    if (Number.isNaN(duration.getDate())) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: Messages.getInvalidTime(music.duration),
      });
      return false;
    }

    return true;
  };

  const saveMusic = () => {
    const submittedMusic = MusicFactory.createSubmittedMusic(music);
    musicService
      .save(submittedMusic)
      .then(() => {
        toast.current.show({
          severity: 'success',
          summary: 'Successfully',
          detail: Messages.MUSIC_SUCCESSFULLY_ADDED,
        });
        setMusic(MusicFactory.createDefaultMusic());
        props.onSuccess();
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
  };

  const editMusic = () => {
    const submittedMusic = MusicFactory.createSubmittedMusic(music);
    musicService
      .update(submittedMusic)
      .then(() => {
        toast.current.show({
          severity: 'success',
          summary: 'Successfully',
          detail: Messages.MUSIC_SUCCESSFULLY_EDITED,
        });
        props.onSuccess();
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
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={props.title}
        visible={props.visible}
        modal={true}
        onHide={() => onHide()}
        style={{ width: '500px' }}
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12">
            <label htmlFor="title" className="p-d-block">
              Title
            </label>
            <InputText
              id="title"
              value={music.title}
              onChange={(e) => setMusic({ ...music, title: e.target.value })}
              autoFocus={true}
              aria-describedby="title-help"
              className={submitted && !music.title ? 'p-invalid p-d-block' : ''}
            />
            {submitted && !music.title && (
              <small id="title-help" className="p-error p-d-block">
                Title is required!
              </small>
            )}
          </div>

          <div className="p-field p-col-12">
            <label htmlFor="artist" className="p-d-block">
              Artist
            </label>
            <InputText
              id="artist"
              value={music.artist}
              onChange={(e) => setMusic({ ...music, artist: e.target.value })}
              aria-describedby="artist-help"
              className={
                submitted && !music.artist ? 'p-invalid p-d-block' : ''
              }
            />
            {submitted && !music.artist && (
              <small id="artist-help" className="p-error p-d-block">
                Artist is required!
              </small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="releaseDate" className="p-d-block">
              Release Date
            </label>
            <InputMask
              id="releaseDate"
              value={music.release_date}
              onChange={(e) =>
                setMusic({ ...music, release_date: e.target.value })
              }
              mask="99/99/9999"
              aria-describedby="releaseDate-help"
              className={
                submitted && !music.release_date ? 'p-invalid p-d-block' : ''
              }
            />
            {submitted && !music.release_date && (
              <small id="releaseDate-help" className="p-error p-d-block">
                Release Date is required!
              </small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="duration" className="p-d-block">
              Duration
            </label>
            <InputMask
              id="duration"
              value={music.duration}
              onChange={(e) => setMusic({ ...music, duration: e.target.value })}
              mask="99:99"
              aria-describedby="duration-help"
              className={
                submitted && !music.duration ? 'p-invalid p-d-block' : ''
              }
            />
            {submitted && !music.duration && (
              <small id="duration-help" className="p-error p-d-block">
                Duration is required!
              </small>
            )}
          </div>

          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="numberViews">Number Views</label>
            <InputNumber
              id="numberViews"
              value={music.number_views}
              onValueChange={(e) =>
                setMusic({ ...music, number_views: e.value })
              }
            />
          </div>

          <div className="p-field p-col-12 p-md-6">
            <label>Is Feat?</label>
            <div className="p-field-radiobutton" style={{ marginTop: '8px' }}>
              <RadioButton
                id="yes"
                name="feat"
                value={true}
                onChange={(e) => setMusic({ ...music, feat: e.value })}
                checked={music.feat}
              />
              <label htmlFor="yes">Yes</label>
              <RadioButton
                id="no"
                name="feat"
                value={false}
                onChange={(e) => setMusic({ ...music, feat: e.value })}
                checked={!music.feat}
                style={{ marginLeft: '15px' }}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>

          <div className="p-field p-col-12 p-md-3">
            <Button
              label="Save"
              onClick={actionSave}
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

export default MusicDialog;
