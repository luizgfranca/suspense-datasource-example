export class Datasource {
    #loadingStatus = {};
    
    /** @type {Promise} */
    #loadingPromise = {};

    #data = {};
    #error = {};

    async fetch(key) {
        throw new Error('fetch() should be overriden with the function to load your dataset')
    }

    #resetAll() {
        this.#loadingStatus = {};    
        this.#loadingPromise = {};
        this.#data = {};
        this.#error = {};
    }

    reset(key) {
        if (key === undefined) {
            return this.#resetAll()
        }

        if (key && typeof key !== "number" && typeof key !== "string") {
            throw new Error('unsupported key type')
        }

        delete this.#loadingStatus[key]
        delete this.#loadingPromise[key]
        delete this.#data[key]
        delete this.#error[key]
    }

    get(key) {
        if (key && typeof key !== "number" && typeof key !== "string") {
            throw new Error('unsupported key type')
        }

        switch(this.#loadingStatus[key]) {
            /**
             * Ainda não efetuou o fetch, então:
             *  - o executa
             *  - define os handlers de sucesso e erro
             *    para atualizar o resultado e o loadingStatus
             *    quando o carregamento terminar
             *  - atauliza o loadingStatus sinalizando que está
             *    carregando
             */
            case undefined:
                this.#loadingPromise[key] = this.fetch(key);
                this.#loadingPromise[key].
                    then((data) => {
                        this.#data[key] = data;
                        this.#loadingStatus[key] = 'success'
                    }).catch(e => {
                        this.#error[key] = e;
                        this.#loadingStatus[key] = 'fail'
                    });
                this.#loadingStatus[key] = 'pending'
                throw this.#loadingPromise[key];
            // ainda está carregando => exceção com promise
            // <Suspense /> vai tratar ela
            case 'pending':
                throw this.#loadingPromise[key];
            // houve um erro => exceção com resultado de erro
            case 'fail':
                throw this.#error[key]
            // sucess => retorna dados
            case 'success':
                return this.#data[key];
        }
    }
}