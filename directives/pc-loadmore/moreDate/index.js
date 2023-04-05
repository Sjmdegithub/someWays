import moreData from "./moreData";
const install = function(Vue) {
    Vue.directive('moreData', moreData)
}
moreData.install = install
export default moreData
