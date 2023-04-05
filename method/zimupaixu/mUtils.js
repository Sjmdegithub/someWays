
//这是一个计算属性,将获取的数据按照A-Z字母开头排序,this.groupcity从后端拿的数据，可能需要做一些修改
 function sortgroupcity(){
        let sortobj = {};
        for (let i = 65; i <= 90; i++) {
            if (this.groupcity[String.fromCharCode(i)]) {
                sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
            }
        }
        return sortobj
    };

