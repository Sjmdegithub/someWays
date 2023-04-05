function loading(el, binding){
    let scrollEl = document.documentElement
    let loadMore = () =>{
        if (scrollEl.scrollHeight-scrollEl.scrollTop-scrollEl.clientHeight < 100)
        {
            console.log(el.children[0].clientHeight)
            binding.value()
        }
    }
    function throttle(fn) {
        // 4、通过闭包保存一个标记
        let canRun = true;
        return function() {
            // 5、在函数开头判断标志是否为 true，不为 true 则中断函数
            if(!canRun) {
                return;
            }
            // 6、将 canRun 设置为 false，防止执行之前再被执行
            canRun = false;
            // 7、定时器
            setTimeout( () => {
                fn.call(this, arguments);
                // 8、执行完事件（比如调用完接口）之后，重新将这个标志设置为 true
                canRun = true;
            }, 200);
        };
    }
    window.addEventListener("scroll",throttle(loadMore))
}

export default {
    bind(el, binding){
        loading(el, binding)
    }
}