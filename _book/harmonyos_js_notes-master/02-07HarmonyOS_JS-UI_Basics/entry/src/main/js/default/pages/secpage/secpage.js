import router from '@system.router';

export default {
    data: {
        value: ''
    //        data1: '',
    //        data2: {
    //            data3: []
    //        }
    },
    onInit() {
        console.info('showData1:' + this.data1);
        console.info('showData3:' + this.data2.data3);
        var page = router.getState();
        console.log('current index = ' + page.index);
        console.log('current name = ' + page.name);
        console.log('current path = ' + page.path);
    },
    onShow(){
        console.log(this.$element('text'))
        console.log(this.$refs['refText'])
    },
    goback() {
        router.back()
    }
}
