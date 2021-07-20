import {configure} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import React from 'react';
import {MovieStore} from '../../models';
import {createMoviesStore} from './MoviesStore';

configure({enforceActions: 'always'});

const MoviesContext = React.createContext<MovieStore>({} as MovieStore);

export const MoviesProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const moviesStore = useLocalObservable(createMoviesStore);
  return (
    <MoviesContext.Provider value={moviesStore}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMoviesStore = () => React.useContext<MovieStore>(MoviesContext);
