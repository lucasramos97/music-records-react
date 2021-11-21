import React, { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Tooltip } from 'primereact/tooltip';

import MusicDialog from './MusicDialog';
import DeleteMusic from './DeleteMusic';

import { ILazyParams, IMusic } from '../../interfaces/all';
import MusicService from '../../services/MusicService';
import NumberUtils from '../../utils/NumberUtils';
import StringUtils from '../../utils/StringUtils';
import MusicFactory from '../../utils/MusicFactory';

const MusicList = () => {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [musics, setMusics] = useState(null);
  const [lazyParams, setLazyParams] = useState<ILazyParams>({
    first: 0,
    page: 0,
    rows: 5,
  });
  const [visibleMusicDialog, setVisibleMusicDialog] = useState(false);
  const [titleMusicDialog, setTitleMusicDialog] = useState('');
  const [music, setMusic] = useState(MusicFactory.createDefaultMusic());
  const [visibleDeleteMusic, setVisibleDeleteMusic] = useState(false);
  const [musicToDelete, setMusicToDelete] = useState(
    MusicFactory.createDefaultMusic()
  );
  const toast = useRef(null);

  const musicService = new MusicService();

  useEffect(() => {
    loadLazyData();
  }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const openAdd = () => {
    setTitleMusicDialog('Add Music');
    setMusic(MusicFactory.createDefaultMusic());
    setVisibleMusicDialog(true);
  };

  const loadLazyData = () => {
    setLoading(true);
    setTimeout(() => {
      musicService
        .getAll(lazyParams.page + 1, lazyParams.rows)
        .then((res) => {
          setMusics(res.data.content);
          setTotalRecords(res.data.total);
          setLoading(false);
        })
        .catch((err: AxiosError) =>
          toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: err.response.data.message,
          })
        );
    }, 1000);
  };

  const releaseDateBodyTemplate = (music: IMusic): string => {
    return StringUtils.displayReleaseDate(music.release_date);
  };

  const durationBodyTemplate = (music: IMusic): string => {
    return StringUtils.displayDuration(music.duration);
  };

  const numberViewsBodyTemplate = (music: IMusic): string => {
    return NumberUtils.displayNumberViews(music.number_views);
  };

  const featBodyTemplate = (music: IMusic): string => {
    return music.feat ? 'Yes' : 'No';
  };

  const editMusicButton = (music: IMusic) => {
    return (
      <React.Fragment>
        <Button
          onClick={() => openEdit(music)}
          tooltip="Edit Music"
          tooltipOptions={{ position: 'left' }}
          className="p-button-rounded p-button-primary"
          icon="pi pi-pencil"
        />
      </React.Fragment>
    );
  };

  const openEdit = (music: IMusic) => {
    setTitleMusicDialog('Edit Music');
    setMusic(MusicFactory.createEditMusic(music));
    setVisibleMusicDialog(true);
  };

  const deleteMusicButton = (music: IMusic) => {
    return (
      <React.Fragment>
        <Button
          onClick={() => openDelete(music)}
          tooltip="Delete Music"
          tooltipOptions={{ position: 'left' }}
          className="p-button-rounded p-button-danger"
          icon="pi pi-trash"
        />
      </React.Fragment>
    );
  };

  const openDelete = (music: IMusic) => {
    setMusicToDelete(music);
    setVisibleDeleteMusic(true);
  };

  return (
    <>
      <Toast ref={toast} />

      <h1>Music List</h1>

      <div className="table-top-buttons">
        <Button
          label="Add"
          onClick={openAdd}
          className="p-button-primary"
          icon="pi pi-plus"
        />
      </div>

      <DataTable
        value={musics}
        lazy={true}
        responsiveLayout="scroll"
        paginator={true}
        first={lazyParams.first}
        rows={lazyParams.rows}
        totalRecords={totalRecords}
        onPage={(event) => setLazyParams({ ...event })}
        loading={loading}
        emptyMessage="No musics found."
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} musics"
      >
        <Column field="title" header="Title" />
        <Column field="artist" header="Artist" />
        <Column
          field="release_date"
          header="Release Date"
          body={releaseDateBodyTemplate}
        />
        <Column
          field="duration"
          header="Duration"
          body={durationBodyTemplate}
        />
        <Column
          field="number_views"
          header="Number Views"
          body={numberViewsBodyTemplate}
        />
        <Column field="feat" header="Feat" body={featBodyTemplate} />
        <Column header="Edit" exportable={false} body={editMusicButton} />
        <Column header="Delete" exportable={false} body={deleteMusicButton} />
      </DataTable>

      <MusicDialog
        title={titleMusicDialog}
        music={music}
        onSuccess={loadLazyData}
        visible={visibleMusicDialog}
        setVisible={setVisibleMusicDialog}
      />

      <DeleteMusic
        music={musicToDelete}
        onSuccess={loadLazyData}
        visible={visibleDeleteMusic}
        setVisible={setVisibleDeleteMusic}
      />
    </>
  );
};

export default MusicList;
