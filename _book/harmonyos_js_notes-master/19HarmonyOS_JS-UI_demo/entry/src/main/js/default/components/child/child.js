
export default {
    data:{

    },
    childEmit() {
        this.$emit('child_emit',{text: '顺便传个参数'})
    }
}