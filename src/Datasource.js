export class Datasource {
    /** @type {('none'|'pending'|'success'|'reject')} */
    #loadingStatus = 'none';
    
    /** @type {Promise} */
    #loadingPromise = undefined;

    #data = undefined;
    #error = undefined;
}