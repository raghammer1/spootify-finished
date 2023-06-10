import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { useDispatch, useSelector } from 'react-redux';
import SpotifyAuthorization from './api';
import {
  setCategories,
  setNewReleases,
  setPlaylists,
  tokenSetter,
} from '../features/slice';
import { useEffect, useMemo, useState } from 'react';

const Discover = () => {
  const slice = useSelector((store) => store.slice);
  const { newReleases, playlists, categories } = slice;
  const dispatch = useDispatch();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `grant_type=client_credentials&client_id=8f0390b2251347daa6b3e1471e8f0703&client_secret=e2bad058b21b40a9abf023337d82aa91`,
        });
        if (response.ok) {
          const data = await response.json();
          const to = data?.access_token;
          console.log(to);
          dispatch(tokenSetter({ to }));
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    FetchData();
  }, []);

  useEffect(() => {
    // Run PlaylistsFinder whenever token changes
    if (slice.token) {
      const PlaylistsFinder = async () => {
        try {
          const res = await fetch(
            'https://api.spotify.com/v1/browse/featured-playlists',
            {
              headers: {
                Authorization: `Bearer ${slice.token}`,
              },
            }
          );
          const data = await res.json();
          dispatch(setPlaylists({ playlists: data?.playlists?.items }));
        } catch (error) {
          console.log(error);
        }
      };
      const CategoriesFinder = async () => {
        try {
          const res = await fetch(
            'https://api.spotify.com/v1/browse/categories ',
            {
              headers: {
                Authorization: `Bearer ${slice.token}`,
              },
            }
          );
          const data = await res.json();
          dispatch(setCategories({ categories: data?.categories?.items }));
        } catch (error) {
          console.log(error);
        }
      };
      const NewReleasesFinder = async () => {
        try {
          const res = await fetch(
            'https://api.spotify.com/v1/browse/new-releases ',
            {
              headers: {
                Authorization: `Bearer ${slice.token}`,
              },
            }
          );
          const data = await res.json();
          dispatch(setNewReleases({ newReleases: data?.albums?.items }));
        } catch (error) {
          console.log(error);
        }
      };
      PlaylistsFinder();
      CategoriesFinder();
      NewReleasesFinder();
    }
  }, [slice.token]);

  return (
    <div className="discover">
      <DiscoverBlock
        text="RELEASED THIS WEEK"
        id="released"
        data={newReleases}
      />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
      <DiscoverBlock
        text="BROWSE"
        id="browse"
        data={categories}
        imagesKey="icons"
      />
    </div>
  );
};

export default Discover;
