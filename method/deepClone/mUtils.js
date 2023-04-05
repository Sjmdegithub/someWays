function deepclone (input){
    if (!input && typeof input !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const a = input.constructor === Array ? [] : {}
    Object.keys(input).forEach((value)=>{
        if (input[value] && typeof input[value] ==="object"){
            a[value] = deepclone(input[value])
        }
        else {
            a[value] = input[value]
        }
    })
    return a
}