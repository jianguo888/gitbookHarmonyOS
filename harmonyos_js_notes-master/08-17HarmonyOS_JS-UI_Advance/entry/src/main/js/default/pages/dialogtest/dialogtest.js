import prompt from '@system.prompt';
export default {
    showDialog() {
        this.$element('dialog').show();
    },
    closeDialog() {
        this.$element('dialog').close();
    },
    showDialogByPrompt() {
        prompt.showDialog({
            title: "对话框标题",
            message: "对话框信息",
            buttons: [
                {text:'按钮1', color: '#666666'},
                {text:'按钮2', color: '#666666'}
            ],
            success: function(data) {
                console.info('对话框已选择，选择按钮为: ' + data.index);
            },
            cancel: function() {
                console.info('对话框已取消。');
            }
        })
    },
    showToast() {
        prompt.showToast({
            message: 'Toast信息',
            duration: 2000,
        });
    }
}
