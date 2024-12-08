export class Datasource {
    /** @type {('none'|'pending'|'success'|'reject')} */
    #loadingStatus = 'none';
    
    /** @type {Promise} */
    #loadingPromise = undefined;

    #data = undefined;
    #error = undefined;

    async fetch() {
        throw new Error('fetch() should be overriden with the function to load your dataset')
    }
}