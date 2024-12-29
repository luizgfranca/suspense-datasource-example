import { createContext, useContext } from "react";
import { AlbumDatasource } from "./AlbumDatasource";

const RootContext = createContext(null);

const albumDatasource = new AlbumDatasource();

function getAlbums() {
  return albumDatasource.get();
}

export function ContextProvider(props) {
  return (
    <RootContext.Provider
      value={{
        getAlbums
      }}
    >
      {props.children}
    </RootContext.Provider>
  );
}

export function useProvider() {
  const maybeContext = useContext(RootContext);
  if (!maybeContext) throw new Error("invalid application context");

  return maybeContext;
}
