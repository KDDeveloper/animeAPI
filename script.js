var heading = document.createElement('h1');
heading.setAttribute('id','heading');
heading.innerText = 'Find a new Anime!';
document.body.append(heading);


var sBar = document.createElement('div');
sBar.setAttribute('class','search-bar');
document.body.append(sBar);

var upLink = document.createElement('a')
upLink.setAttribute('href','#heading');
document.body.append(upLink);

var up = document.createElement('div');
up.setAttribute('class','up');
up.innerText = '↑'
upLink.appendChild(up);


var searchInput = document.createElement('input');
searchInput.setAttribute('type',"search");
searchInput.setAttribute('placeholder',"search for an Anime");
searchInput.setAttribute('id','search');
sBar.appendChild(searchInput);

var searchBtn = document.createElement('input');
searchBtn.setAttribute('type',"submit");
searchBtn.setAttribute('value',"search");
searchBtn.setAttribute('id','search-btn');
searchBtn.setAttribute('onclick','anime()');
sBar.appendChild(searchBtn);


var div = document.createElement('div');
div.setAttribute('class','row search-results');
document.body.append(div);

async function anime (){
    div.innerHTML='';
    let input = document.querySelector('#search');
    console.log(input)
    let search = input.value;
    // console.log(search);
    await fetch(`https://api.jikan.moe/v3/search/anime?q=${search}`)
    .then((response)=>response.json())
    .then((result)=>result.results.forEach(c=>searchResult(c)))
    .catch(()=>alert('The searched Anime is does not exist'));
    // .then((data)=>console.log(data.results))
    readMore()
}


    const searchResult = ({title, start_date, end_date, score, type, image_url})=>{
        // let d = document.querySelector('.search-result')
        let result = document.createElement('div');
        result.setAttribute('class','col-lg-4 result');
        div.appendChild(result);
        result.innerHTML = `
        <img src= ${image_url}>
        <h5>${title}</h5>
        <div class="more-info">
        <p>Start date: ${start_date}</p>
        <p>End date: ${end_date}</p>
        <p>Type: ${type}</p>
        <p>Imdb Rating: ${score}</p>
        </div>
        <div class="read-more-btn">
        <p>Read more</p>
        </div>
        `
    }

    const readMore  =()=>{
        console.log('hey')
        let readInfo = document.querySelectorAll('.read-more-btn');
        let readInfoP = document.querySelectorAll('.read-more-btn p');
        // console.log(readInfo)
        let moreInfo = document.querySelectorAll('.more-info');
        let display = document.querySelector('.display');
       for (let i = 0; i < readInfo.length; i++) {
        
        readInfo[i].addEventListener('click',()=>{ 
            let el = moreInfo[i]
            console.log(el);
            // el.classList.toggle('display')
            if(el.style.display==''){
                el.style.display='block'
                readInfoP[i].innerText = 'Read less'
            } else {
                el.style.display=''
                readInfoP[i].innerText = 'Read more'
            }
        })

       }
       
    }

    