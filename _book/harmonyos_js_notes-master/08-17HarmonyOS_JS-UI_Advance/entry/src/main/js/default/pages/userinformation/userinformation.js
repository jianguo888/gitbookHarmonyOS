import utils from '../../common/utils.js';

export default {
    data: {
        userinformation: null
    },
    onInit() {
        this.userinformation = utils.getUserInformation();
    }
}
