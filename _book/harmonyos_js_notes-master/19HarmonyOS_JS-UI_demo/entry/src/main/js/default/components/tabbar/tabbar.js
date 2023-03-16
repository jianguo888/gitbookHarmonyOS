import tabbarItems from '../../common/data/tabbarItem.js'
import router from '@system.router';

export default {
    data: {
        tabbarItems
    },
    // 接受page组件传递的参数
    props: {
        index: {
            type: Number,
            default() {
                return 0;
            }
        }
    },
    jump(index) {
        // 方法1
        //        router.push({
        //            uri: this.tabbarItems[index].path
        //        })
        //        this.tabbarItems.forEach((item,i) => {
        //            item.img = tabbarItems[i].img;
        //        });
        //        console.log(router.getState().index+ this.tabbarItems[index].simg);
        //        this.tabbarItems[index].img = this.tabbarItems[index].simg;
        // 方法2
        switch (index) {
            case 0:
                router.push({
                    uri: "pages/index/index"
                })
                break;
            case 1:
                router.push({
                    uri: "pages/demo_chart/demo_chart"
                })
                break;
            case 2:
                router.push({
                    uri: "pages/demo_todolist/demo_todolist"
                })
                break;
            case 3:
                router.push({
                    uri: "pages/demo_fetch/demo_fetch"
                })
                break;
        }
    }
}