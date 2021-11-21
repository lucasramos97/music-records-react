import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { ILazyParams, IMusic } from '../../interfaces/all';
import MusicService from '../../services/MusicService';
import NumberUtils from '../../utils/NumberUtils';
import StringUtils from '../../utils/StringUtils';

const DeletedMusicList = () => {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [musics, setMusics] = useState(null);
  const [lazyParams, setLazyParams] = useState<ILazyParams>({
    first: 0,
    page: 0,
    rows: 5,
  });
  const toast = useRef(null);
  const navigate = useNavigate();

  const musicService = new MusicService();

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

  return (
    <>
      <Toast ref={toast} />
      <h1>Deleted Music List</h1>
      <div className="table-top-buttons">
        <Button
          label="Music List"
          onClick={goToMusicList}
          className="p-button-primary"
          icon="pi pi-arrow-right"
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
      </DataTable>
    </>
  );
};

export default DeletedMusicList;
