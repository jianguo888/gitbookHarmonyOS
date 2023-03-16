import router from '@system.router';

export default {
    gotoCptTextPage() {
        // 跳转到cpt_text页面
        router.push ({
            uri: 'pages/cpt_text/cpt_text'
        });
    },
    gotoCptProgressPage() {
        // 跳转到cpt_progress页面
        router.push ({
            uri: 'pages/cpt_progress/cpt_progress'
        });
    },
    gotoCptInteractivePage() {
        // 跳转到cpt_interactive页面
        router.push ({
            uri: 'pages/cpt_interactive/cpt_interactive'
        });
    },
    gotoCptPickerPage() {
        // 跳转到cpt_picker页面
        router.push ({
            uri: 'pages/cpt_picker/cpt_picker'
        });
    },
    gotoCptMenuAndSelectPage() {
        // 跳转到cpt_menuandselect页面
        router.push ({
            uri: 'pages/cpt_menuandselect/cpt_menuandselect'
        });
    },
    gotoCptImagePage() {
        // 跳转到cpt_image页面
        router.push ({
            uri: 'pages/cpt_image/cpt_image'
        });
    },
    gotoCptVideoPage() {
        // 跳转到cpt_video页面
        router.push ({
            uri: 'pages/cpt_video/cpt_video'
        });
    }
}
