import router from '@system.router';

export default {
    data: {
        title: ""
    },
    onInit() {
        this.title = this.$t('strings.world');
    },
    goPage() {
        router.push({
            uri: 'pages/secpage/secpage',
            params: {
                data1: 'message',
                data2: {
                    data3: [123, 456, 789]
                },
            },
        });
    }
}
