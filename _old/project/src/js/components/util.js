function propertyInfoByPath(obj,path) {
    var arr = path.split('.');

    var parent = obj;
    var propName;

    if(arr.length === 0 || !obj)
        return null;

    for (var i = 0; i  <  arr.length; i++) {
        if(!obj){
            if(i > 1)
                obj = parent[arr[i-1]] = {};
            else
                return null;
        }

        parent = obj;
        propName = arr[i];
        obj = parent[arr[i]];

    }

    return { instance : obj, parentInstance : parent, propName : propName};

}
