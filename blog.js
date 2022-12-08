document.getElementById('blog-button').addEventListener('click',function(event)
{
    document.getElementById('items').innerHTML = '';
    const found = document.getElementById('found-section').children[0].children[0];
    // found.innerText = 'You are in blog';
    const accrClass = document.getElementById('accordion-class');
    accrClass.classList.remove('d-none')
    
})


document.getElementById('news-button').addEventListener('click',function(event)
{
    document.getElementById('items').innerHTML = '';
    const accrClass = document.getElementById('accordion-class');
    accrClass.classList.add('d-none')
})