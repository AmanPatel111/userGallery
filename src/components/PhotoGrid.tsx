import { useEffect } from 'react';
import type { SyntheticEvent } from 'react';
import { fetchPhotos, selectAlbum, viewPhoto } from '../store/gallerySlice';
import { useAppDispatch, useAppSelector } from '../store';

const fallbackTo = (id: number, size: number) => (e: SyntheticEvent<HTMLImageElement>) => {
  const backup = `https://picsum.photos/seed/${id}/${size}`;
  if (e.currentTarget.src !== backup) {
    e.currentTarget.src = backup;
  }
};

const Chevron = ({ d }: { d: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export default function PhotoGrid() {
  const dispatch = useAppDispatch();
  const { photos, selectedAlbum, photoIndex } = useAppSelector((state) => state.gallery);
  const album = selectedAlbum!;
  const photo = photoIndex === null ? null : photos[photoIndex];

  const go = (step: number) =>
    dispatch(viewPhoto((photoIndex! + step + photos.length) % photos.length));

  useEffect(() => {
    dispatch(fetchPhotos(album.id));
  }, [dispatch, album.id]);

  return (
    <div className="modal" onClick={() => dispatch(selectAlbum(null))}>
      <section className="modal-body" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          aria-label="Close"
          onClick={() => dispatch(selectAlbum(null))}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <h2 className="section-title">
          Photos <span className="count">{photos.length}</span>
        </h2>
        <p className="muted album-name">{album.title}</p>
        <div className="photo-grid">
        {photos.map((photo, i) => (
          <figure key={photo.id} className="photo" onClick={() => dispatch(viewPhoto(i))}>
            <img
              className="photo-main"
              src={photo.url}
              alt={photo.title}
              loading="lazy"
              onError={fallbackTo(photo.id, 300)}
            />
            <figcaption>
              <img
                className="photo-thumb"
                src={photo.thumbnailUrl}
                alt=""
                loading="lazy"
                onError={fallbackTo(photo.id, 60)}
              />
              <span>{photo.title}</span>
            </figcaption>
          </figure>
        ))}
        </div>
      </section>

      {photo && (
        <div
          className="modal lightbox"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(viewPhoto(null));
          }}
        >
          <button
            className="nav prev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            <Chevron d="M15 18l-6-6 6-6" />
          </button>
          <img src={photo.url} alt={photo.title} onClick={(e) => e.stopPropagation()} onError={fallbackTo(photo.id, 600)} />
          <p>{photo.title}</p>
          <button
            className="nav next"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            <Chevron d="M9 18l6-6-6-6" />
          </button>
        </div>
      )}
    </div>
  );
}
