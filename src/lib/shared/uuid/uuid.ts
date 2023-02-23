// http://slavik.meltser.info/the-efficient-way-to-create-guid-uuid-in-javascript-with-explanation/  
const uuid = () => {
    const _p8 = (s: boolean = false) => {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

export default uuid;