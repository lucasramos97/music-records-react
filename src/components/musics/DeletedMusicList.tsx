import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import LoggedUser from '../utils/LoggedUser';
import RestoreMusics from './RestoreMusics';
import DefinitiveDeleteMusic from './DefinitiveDeleteMusic';
import EmptyList from './EmptyList';

import { ILazyParams, IMusic } from '../../interfaces/all';
import MusicService from '../../services/MusicService';
import NumberUtils from '../../utils/NumberUtils';
import StringUtils from '../../utils/StringUtils';
import MusicFactory from '../../utils/MusicFactory';

const DeletedMusicList = () => {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [musics, setMusics] = useState<IMusic[]>([]);
  const [lazyParams, setLazyParams] = useState<ILazyParams>({
    first: 0,
    page: 0,
    rows: 5,
  });
  const [selectedMusics, setSelectedMusics] = useState<IMusic[]>([]);
  const [visibleRestore, setVisibleRestore] = useState(false);
  const [visibleDefinitiveDelete, setVisibleDefinitiveDelete] = useState(false);
  const [musicToDelete, setMusicToDelete] = useState(
    MusicFactory.createDefaultMusic()
  );
  const [visibleEmptyList, setVisibleEmptyList] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const musicService = new MusicService();

  const openRestore = () => {
    setVisibleRestore(true);
  };

  const goToMusicList = () => {
    navigate('/musics');
  };

  useEffect(() => {
    loadMusics();
  }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMusics = () => {
    setLoading(true);
    setTimeout(() => {
      musicService
        .getAllDeleted(lazyParams.page + 1, lazyParams.rows)
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

  const reloadMusics = () => {
    setSelectedMusics([]);
    loadMusics();
  };

  const definitiveDeleteMusicButton = (music: IMusic) => {
    return (
      <React.Fragment>
        <Button
          onClick={() => openDefinitiveDelete(music)}
          tooltip="Definitive Delete Music"
          tooltipOptions={{ position: 'left' }}
          className="p-button-rounded p-button-danger"
          icon="pi pi-trash"
        />
      </React.Fragment>
    );
  };

  const openDefinitiveDelete = (music: IMusic) => {
    setMusicToDelete(music);
    setVisibleDefinitiveDelete(true);
  };

  const openEmptyList = () => {
    setVisibleEmptyList(true);
  };

  return (
    <>
      <Toast ref={toast} />
      <LoggedUser />
      <h1>Deleted Music List</h1>
      <div className="table-top-buttons">
        <Button
          label="Restore"
          onClick={openRestore}
          disabled={selectedMusics.length === 0}
          className="p-button-primary"
          icon="pi pi-refresh"
        />

        <Button
          label="Empty List"
          onClick={openEmptyList}
          disabled={musics.length === 0}
          className="p-button-danger"
          icon="pi pi-ban"
        />

        <Button
          label="Music List"
          onClick={goToMusicList}
          className="p-button-primary"
          icon="pi pi-arrow-right"
        />
      </div>

      <DataTable
        value={musics}
        selection={selectedMusics}
        onSelectionChange={(e) => setSelectedMusics(e.value)}
        dataKey="id"
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
        <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
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
        <Column
          header="Delete"
          exportable={false}
          body={definitiveDeleteMusicButton}
        />
      </DataTable>

      <RestoreMusics
        musics={selectedMusics}
        onSuccess={reloadMusics}
        visible={visibleRestore}
        setVisible={setVisibleRestore}
      />

      <DefinitiveDeleteMusic
        music={musicToDelete}
        onSuccess={reloadMusics}
        visible={visibleDefinitiveDelete}
        setVisible={setVisibleDefinitiveDelete}
      />

      <EmptyList
        onSuccess={reloadMusics}
        visible={visibleEmptyList}
        setVisible={setVisibleEmptyList}
      />
    </>
  );
};

export default DeletedMusicList;
