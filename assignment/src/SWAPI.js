
let url = "https://swapi.dev/api/planets/?page=";
let cache = new Object();

function getJsonFile(num){
    if(!cache[num]){
        console.log(url + num);
        fetch(url + num)
        .then((res) => res.json()).then((out) => {
            cache[num] = out;
          })
    }
    console.log(cache[num])
    return cache[num];
}

export {getJsonFile};
