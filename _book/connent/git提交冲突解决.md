# git合并的时候，冲突问题Merging is not possible because you have unmerged files

简单的来说就是：

![image-20211102134408715](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20211102134408715.png)

用git diff或者git status 查看哪些文件冲突，有冲突的会提示：
++<<<<<<< HEAD

++<<<<<<< new_branch

修改你的冲突的文件，修改完之后，保存。

用git add xxx，把你修改的文件全部都添加进去。

![image-20211102134443564](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20211102134443564.png)

最后，用git commit -a -m ” 备注信息 ” 提交，完成。


![image-20211102134456859](https://luckly007.oss-cn-beijing.aliyuncs.com/image/image-20211102134456859.png)