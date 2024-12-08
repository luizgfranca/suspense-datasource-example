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

    get() {
        switch(this.#loadingStatus) {
            /**
             * Ainda não efetuou o fetch, então:
             *  - o executa
             *  - define os handlers de sucesso e erro
             *    para atualizar o resultado e o loadingStatus
             *    quando o carregamento terminar
             *  - atauliza o loadingStatus sinalizando que está
             *    carregando
             */
            case 'none':
                this.#loadingPromise = this.fetch();
                this.#loadingPromise.
                    then((data) => {
                        this.#data = data;
                        this.#loadingStatus = 'success'
                    }).catch(e => {
                        this.#error = e;
                        this.#loadingStatus = 'fail'
                    });
                this.#loadingStatus = 'pending'
                throw this.#loadingPromise;
            // ainda está carregando => exceção com promise
            // <Suspense /> vai tratar ela
            case 'pending':
                throw this.#loadingPromise;
            // houve um erro => exceção com resultado de erro
            case 'fail':
                throw this.#error
            // sucess => retorna dados
            case 'success':
                return this.#data;
        }
    }
}