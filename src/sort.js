let tags        = {};
let weighs      = {};
let sorted      = {};
let couples     = {};
let sortedArray = [];
let links       = [];

function sort(data) {
    index(data);
    weigh();
    srt();
    sortToArray();
    couple();
    link(sortedArray[0].id, links, 0);

    const sorted = [];

    links.forEach((i, j) => {
        sorted[j] = data[i];
    });

    return sorted;
}

function index(data){



    for(let i in data){

        for(let j in data[i].tags){
            if(!tags.hasOwnProperty(data[i].tags[j])){
                tags[data[i].tags[j]] = [];
            }

            tags[data[i].tags[j]].push(i);
        }
    }
}

function weigh(){
    for(let i in tags){

        for(let j = 0; j < tags[i].length; j++){
            let left = tags[i][j];
            for(let k = j + 1; k < tags[i].length; k++){

                // let right = tags[i][k];
                // let key   = left + "-" + right;
                // if(!weighs.hasOwnProperty(key)){
                //     weighs[key] = 0;
                // }
                // weighs[key]++;
            }
        }
    }
}

function srt(){
    for(let i in weighs){
        let keys = i.split('-');
        if(!sorted.hasOwnProperty(keys[0])){
            sorted[keys[0]] = 0;
        }
        if(!sorted.hasOwnProperty(keys[1])){
            sorted[keys[1]] = 0;
        }
        sorted[keys[0]]++;
        sorted[keys[1]]++;
    }
}

function couple(){
    for(let i in weighs){
        let keys = i.split('-');
        if(!couples.hasOwnProperty(keys[0])){
            couples[keys[0]] = [];
        }
        if(!couples.hasOwnProperty(keys[1])){
            couples[keys[1]] = [];
        }
        couples[keys[0]].push(keys[1]);
        couples[keys[1]].push(keys[0]);
    }
}

function sortToArray(){
    for(let i in sorted){
        sortedArray.push({id: i, connections: sorted[i]});
    }

    sortedArray.sort(function(a, b){
        return a.connections - b.connections;
    });
}

function link(id, l, s){

    if(couples[id] === undefined ){
        return;
    }
    let connections = couples[id];
    let neighbor    = connections[0];

    for(let j of connections){
        let myIndex = couples[j].indexOf(id);

        if(myIndex > -1){
            couples[j].splice(myIndex, 1);
        }
        if(sorted[j] < neighbor){
            neighbor = j;
        }
    }

    l.push(id);

    link(neighbor, l, s+1)

}

module.exports = { sort };
