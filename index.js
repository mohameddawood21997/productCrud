let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood='create';

function getTotal(){
    if(price.value != ''){
    total.innerHTML =( +price.value + +taxes.value + +ads.value) - +discount.value;
      total.style.background='#060';
    }
    else{
        total.style.background='rgba(222, 73, 73, 0.836)';
        total.innerHTML='';
    }
//    console.log(total.innerHTML);
}

let datapro;
if(localStorage.product != null){
   datapro=JSON.parse( localStorage.product);


}
else{
     datapro=[];
}



submit.onclick=function() {
    let newPro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    // console.log(newPro);

    // تكرار اضافة المنتجات فى مرة واحدى 
    if(mood === 'create'){
        if(newPro.count>1)
        {
            for(let i=0;i<newPro.count;i++){
                datapro.push(newPro);
            }
        }
        else{
            datapro.push(newPro);
        }
        
    }
    else
    {
        datapro[i]=newPro;
        console.log(datapro[i]);
    }
 

    localStorage.setItem('product', JSON.stringify( datapro));

    clearData();
    showData();
    
}

function clearData()
{
   title.value='';
   price.value='';
   taxes.value='';
   ads.value='';
   discount.value='';
   count.value='';
   category.value='';

}

showData();


function showData(){
     let table='';
    for(let i=0 ; i< datapro.length ;i++){
        // console.log(datapro[i].title);
         table += `
         <tr>
             <th>${i}</th>
             <th>${datapro[i].title}</th>
             <th>${datapro[i].price}</th>
             <th>${datapro[i].taxes}</th>
             <th>${datapro[i].ads}</th>
             <th>${datapro[i].discount}</th>
             <th>${datapro[i].total}</th>
             <th>${datapro[i].count}</th>
             <th>${datapro[i].category}</th>
             
             <th ><button onclick="updatePro(${i})" >Update</button></th>
             <th><button onclick="deletePro(${i})">Delete</button></th>
         </tr>
       `;
    }

// console.log(table);


    document.getElementById('tbody').innerHTML=table;
     let btnDelete=document.getElementById('deleteAll');
    if(datapro.length>0)
    {
       btnDelete.innerHTML=` <input onclick="deleteAllpro()" type="button"  value=" DELETE ALL (${datapro.length}) " id="">`;
    }
    else{
        btnDelete.innerHTML='';
    }


    // console.log(datapro);
}
showData();

function deletePro(i){
   datapro.splice(i,1);
   localStorage.product=JSON.stringify(datapro);
   showData();
}

function deleteAllpro(){
datapro.splice(0);
localStorage.clear();
showData();

  
}
function updatePro(i)
{
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    getTotal();
    count.style.display='none';
    category.value=datapro[i].category;
    submit.value='Update';
    let mood='update';
    // console.log(i);
   
}
