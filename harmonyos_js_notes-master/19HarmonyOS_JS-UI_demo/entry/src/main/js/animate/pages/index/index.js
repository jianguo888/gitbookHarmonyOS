//xxx.js
export default {
    data: {
        frames: [
            {
                src: "/common/images/1.png",
            },
            {
                src: "/common/images/2.png",
            },
            {
                src: "/common/images/3.png",
            },
            {
                src: "/common/images/4.png",
            },
            {
                src: "/common/images/5.png",
            }
        ],
    },
    handleStart() {
        this.$refs.animator.start();
    },
    handlePause() {
        this.$refs.animator.pause();
    },
    handleResume() {
        this.$refs.animator.resume();
    },
    handleStop() {
        this.$refs.animator.stop();
    },
};