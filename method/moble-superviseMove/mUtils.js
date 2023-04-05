export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll',() => {
        console.log(document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset)
        showBackFun();
    }, false)
    document.addEventListener('touchstart',() => {
        showBackFun();
    },{passive: true})

    document.addEventListener('touchmove',() => {

        showBackFun();
    },{passive: true})

    document.addEventListener('touchend',() => {
        oldScrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
        moveEnd();
    },{passive: true})

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset != oldScrollTop) {
                oldScrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
                moveEnd();
            }else{
                cancelAnimationFrame(requestFram);
            }
            showBackFun();
        })
    }

    //判断是否达到目标点
    const showBackFun = () => {
        if (document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset > 800) {
            callback(true);
        }else{
            callback(false);
        }
    }
}