class Swapi {
    constructor(params) {
        const { form, elPre, elController, elId, elLoader } = params;
        this.elForm = document.querySelector(`.${form}`);
        this.elPre = elPre;
        this.elController = elController;
        this.elId = elId;
        this.elLoader = elLoader;
        this.elForm.addEventListener('submit', this.formSubmit)
    }



    formSubmit = async (event) => {
        event.preventDefault();
        this.elLoader.classList.remove('d-none');
        const { getSwapiData } = await import('./module.js');
        const formData = new FormData(this.elForm);
        const formAction = this.elForm.action
        const formURL = formData.get('url');
        // console.log('formURL: ', formURL);
        // console.log('getSwapiData: ', await getSwapiData(this.elForm.action, formURL));
        const regExp = /\//;
        const hasSlash = regExp.test(formURL);
        if (hasSlash) {
            const trimURL = formURL.trim();
            const response = await getSwapiData(formAction, trimURL);
            // console.log('Response: ', response)
            this.showResponse(response, trimURL)
        } else {
            alert('Введите /');
            this.elLoader.classList.add('d-none')
        }
    }
    showResponse = (response, url) => {
        if (response?.status === 'success') {
            console.log(response.data)
            const getURLInfo = url.split('/');
            this.elController.classList.remove('d-none');
            this.elController.innerHTML = getURLInfo[0];
            const id = getURLInfo[1];
            if (id) {
                this.elId.classList.remove('d-none');
                this.elId.innerHTML = id;
            } else {
                this.elId.classList.add('d-none')
            }
            this.elPre.innerHTML = JSON.stringify(response.data, null, 2);
        } else {
            this.elController.classList.add('d-none');
            this.elId.classList.add('d-none');
            this.elPre.innerHTML = JSON.stringify(response.data, null, 2)
        }
        this.elLoader.classList.add('d-none');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const swapi = new Swapi({
        form: 'js--swapi_form',
        elPre: document.querySelector('.js--swapi_pre'),
        elController: document.querySelector('.js--swapi_controller'),
        elId: document.querySelector('.js--swapi_id'),
        elLoader: document.querySelector('.js--swapi_load'),
    })
})