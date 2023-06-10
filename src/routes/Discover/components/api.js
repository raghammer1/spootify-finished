import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tokenSetter } from '../features/slice';

const SpotifyAuthorization = () => {
  const slice = useSelector((store) => store.slice);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
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
          setToken(data);
          console.log(data);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);
  const to = token?.access_token;
  useDispatch(tokenSetter({ to }));

  return token.access_token ? true : false;
};

export default SpotifyAuthorization;
