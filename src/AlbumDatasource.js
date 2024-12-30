import { Datasource } from "./Datasource";
import { getAlbums } from "./data";

export class AlbumDatasource extends Datasource {
    async fetch(key){
        return getAlbums(`/${key}/albums`);
    }
}