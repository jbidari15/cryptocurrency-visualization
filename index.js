let url="https://api.coinmarketcap.com/v1/ticker/?limit=200";
let items=document.querySelector(".items");
function getData(){
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(myJson){
        console.log(myJson);
       displayData(myJson);
       searchByName(myJson);
       sortByName(myJson);
       sortByPrice(myJson);
       sortByRank(myJson);
    })
}
getData();

function displayData(obj){
    obj.forEach((element)=>{
        let Items=document.querySelector(".items");
        let detailDiv = document.createElement("div");
            detailDiv.className="detail";
        let name=document.createElement("div");
            name.innerText=element.name;
            name.className="name item";
        let price=document.createElement("div")
            price.innerText="PRICE: "+element.price_usd;
            price.className="price item";
        let rank=document.createElement("div");
            rank.innerText="RANK: "+element.rank;
            rank.className="rank item";
        let oneHourPrice = document.createElement("div");
            oneHourPrice.innerText="PERCENTAGE CHANGE IN ONE HOUR: "+element.percent_change_1h;
            oneHourPrice.className="oneHour item";

        Items.appendChild(detailDiv);
        detailDiv.appendChild(name);
        detailDiv.appendChild(price);
        detailDiv.appendChild(rank);
        detailDiv.appendChild(oneHourPrice);
    })
 
}

function searchByName(obj){
    let search=document.getElementById("search");
   
    search.addEventListener("keyup",(e)=>{
        let matchedItems=obj.filter((element)=>{
            return element.name.toLowerCase().indexOf(e.target.value.toLowerCase())!=-1;
        })
        items.innerHTML="";
      displayData(matchedItems);
    })
}

function sortByName(obj){
 
    let sortByName=document.querySelector(".sortName");
    sortByName.addEventListener("click",()=>{
      obj.sort(function(a,b){
        let nameA =a.name.toUpperCase();
        let nameB =b.name.toUpperCase();
        if(nameA<nameB){
            return -1;
        }
        if(nameA>nameB){
            return 1;
        }
        return 0;
      })
      items.innerHTML="";
      displayData(obj);
    })
}

function sortByPrice(obj){
    let sortByPrice=document.querySelector(".sortPrice");
    sortByPrice.addEventListener("click",()=>{
        obj.sort(function(a,b){
            return a.price_usd - b.price_usd;
        })
        items.innerHTML="";
        displayData(obj);
    })
}
function sortByRank(obj){
    let sortByRank = document.querySelector(".sortRank")
        sortByRank.addEventListener("click",()=>{
        obj.sort((a,b)=>{
            return a.rank-b.rank;
        })
        items.innerHTML="";
        displayData(obj);
        })
    }

