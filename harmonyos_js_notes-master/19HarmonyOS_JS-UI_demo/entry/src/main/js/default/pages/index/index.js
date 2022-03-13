import router from '@system.router';

export default {
    data: {
        title: "",
        num: 0
    },
    onInit() {
        this.title = this.$t('strings.world');

    },
    onShow() {
//        router.push({
//            uri: 'pages/demo_fetch/demo_fetch'
//        })
    },
    gopage() {
        router.push({
            uri: 'pages/demo_todolist/demo_todolist'
        })
    },
    changeNum(e) {
        this.num++;
        console.log(e.detail.text)
    }
}
