import { Datasource } from "./Datasource";
import { getAlbums } from "./data";

export class AlbumDatasource extends Datasource {
    async fetch(key){
        const albums = getAlbums(`/${key}/albums`);
        
        setTimeout(() => {
            console.log('reset')
            this.reset(key)
        }, 10_000)

        return albums;
    }
}