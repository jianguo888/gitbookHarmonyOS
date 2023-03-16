export default {
    data: {
        options:['选项1', '选项2', '选项3'],
        multi_text_options: [
            ['男', '女'],
            ['程序员', '项目经理', '学生', '公务员']
        ]
    },
    showTextPicker() {
        this.$element("picker-text").show();
    },
    showMultiTextPicker() {
        this.$element("picker-multi-text").show();
    },
    showDatePicker() {
        this.$element("picker-date").show();
    },
    showTimePicker() {
        this.$element("picker-time").show();
    },
    showDateTimePicker() {
        this.$element("picker-datetime").show();
    }
}
