const categories = document.getElementsByClassName('categories');
let idNumber;
for (let i = 0; i < categories.length; i++) {
    
    const inputCategory = categories[i];//.lastChild.innerText
    inputCategory.addEventListener('click',function(){
        toggleSpiner(true);

        for (let i = 0; i < categories.length; i++) {
            categories[i].lastChild.classList.remove("active")
            
        }
        const idName = inputCategory.lastChild.innerText;
        nameChange(idName);
        if (idName === 'Home') {
            idNumber = "01";
            inputCategory.lastChild.classList.add("active");
        }
        else if(idName === 'Breaking News'){
            idNumber = "02";
            inputCategory.lastChild.classList.add("active");
        }
        else if(idName === 'Regular News'){
            idNumber = "03";
            inputCategory.lastChild.classList.add("active");
        }
        else if(idName === 'International News'){
            idNumber = "04";
            inputCategory.lastChild.classList.add("active");
        }
        else if(idName === 'Sports'){
            idNumber = "05";
            inputCategory.lastChild.classList.add("active");
        }
        else if(idName === 'Entertainment'){
            idNumber = "06";
            inputCategory.lastChild.classList.add("active");
        }
        else if(idName === 'Culture'){
            idNumber = "07";
            inputCategory.lastChild.classList.add("active");
        }
        else if(idName === 'Arts'){
            idNumber = "08";
            inputCategory.lastChild.classList.add("active");
        }
        else if(idName === 'All News'){
            idNumber = "03";
            inputCategory.lastChild.classList.add("active");
        }
        loadNews(idNumber);
    })
        
}

const loadNews = (idNumber) =>
{
    const url = `https://openapi.programming-hero.com/api/news/category/${idNumber}`;
    fetch(url)
    .then(res => res.json())
    .then(data => creatCards(data.data))
    .catch(error => console.log(error));
}

// loadNews();

const creatCards = (newsAll) =>
{
    newsAll.sort((a,b) => (a.total_view > b.total_view) ? -1 : ((b.total_view > a.total_view) ? 1 : 0));
    const cardDiv = document.getElementById('items');
    cardDiv.textContent='';

    newsAll.forEach(news => {
        const cards = document.createElement('div');
        cards.classList.add('card'); 
        cards.classList.add('mb-3');
        cards.classList.add('shadow-lg');
        cards.classList.add('cards-style');
        cards.innerHTML = 
        `
        <div class="row g-0 p-2">
        <div class="col-md-4">
          <img src="${news.image_url ? news.image_url : 'No Data'}" class="img-fluid h-100 rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${news.title ? news.title:'No Data'}</h5>
            <p class="card-text news-details">${news.details.slice(0,100) ? news.details.slice(0,100) : 'No Data' }...</p>
            <div class="d-flex justify-content-between">
            <div class="d-flex justify-content-center align-items-center">
              <div>
                <img class="mb-2 img-fluid author-img" src="${news.author.img ? news.author.img : 'No Data'}" alt="">
              </div>
              <div>
                <span class="font-size">${news.author.name ? news.author.name : 'No Data'}</span>
                <p class="font-size">${news.author.published_date ? news.author.published_date : 'No Data'}</p>
              </div>
            </div>
            <div>
              <img src="/images/eye.svg" alt="">
              <span>${news.total_view ? news.total_view : 'No Data'}</span>
            </div>
            <div>
              <img src="/images/star-half.svg" alt="">
              <img src="/images/star.svg" alt="">
              <img src="/images/star.svg" alt="">
              <img src="/images/star.svg" alt="">
              <img src="/images/star.svg" alt="">
            </div>
            <div>
              <img src="/images/arrow-right.svg" alt="">
            </div>
          </div>
          <button onclick="loadCardDetails('${news._id}')" class="trending-btn rounded btn btn-primary mt-2 px-3" data-bs-toggle="modal" data-bs-target="#cardDetailModal">Details</button>   
          </div>
        </div>
      </div>
        `
        cardDiv.appendChild(cards);
        
    });
    //stop spiner loader
    toggleSpiner(false);

    let count = document.getElementById('items').children.length;
    if (count === 0) {
        document.getElementById('items').innerHTML = `
        <p class="text-center fs-1">No Data Found</p>
        `;
    }
    const countSpace = document.getElementById('countCard');
    countSpace.innerText = count;

}
function nameChange(value)
{
    const countName= document.getElementById('count-name');
    countName.innerText = value;
}


const toggleSpiner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

const loadCardDetails = id =>
{
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => creatCardDetails(data.data))
    .catch(error => console.log(error));
}

const creatCardDetails = (data) =>
{
    const modalTitle = document.getElementById('cardDetailModalLabel');
    modalTitle.innerText = data[0].title ? data[0].title : 'No Data';
    const cardDetails = document.getElementById('card-details');
    cardDetails.innerHTML=
    `
    <img class="img-fluid" src="${data[0].image_url ? data[0].image_url : 'No Data'}" alt="">
    <p class="mt-3"><span class="fw-bold">Total View :</span> ${data[0].total_view ? data[0].total_view : 'No Data'}</p>
    <p class="mt-3">${data[0].details ? data[0].details : 'No Data'}</p>
    <p><span class="fw-bold">Author Name :</span> ${data[0].author.name ? data[0].author.name : 'No Data'} </p>
    <p ><span class="fw-bold">Publish Date :</span> ${data[0].author.published_date ? data[0].author.published_date : 'No Data'} </p>
    `
}

loadNews();


