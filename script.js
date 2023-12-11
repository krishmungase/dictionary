let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let notfound = document.querySelector('.not_found');
let apiKey = '50fdc36e-6ff0-42e3-afac-17febc58d0df';
let defBox = document.querySelector('.def')
let audioBox = document.querySelector('.audio');
let loding = document.querySelector('.loading');

searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    
    audioBox.innerHTML = '';
    notfound.innerText = '';
    defBox.innerText = '';

    // get input data
    let word = input.value;
    // call API get data
    if(word == ""){
        alert('Word is required‼️')
        return;
    }

    getdata(word);


})

async function getdata(word){
    loding.style.display = 'block';
    // Ajax API;
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);

    const data = await response.json();

    if(!data.length){
        loding.style.display = 'none';
        notfound.innerText = 'No result found 😔';
        return;
    }

    if(typeof data[0] === 'string'){
        loding.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean🧐?'
        notfound.appendChild(heading);
        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notfound.appendChild(suggestion);
        });
        return;
    }

    // Result Found
    loding.style.display = 'none';
    let defination = data[0].shortdef[0];
    defBox.innerText = defination;


    // sound
    const soundName = data[0].hwi.prs[0].sound.audio;
    if(soundName){
        renderSound(soundName);
    }

    console.log(data);
}

function renderSound(soundName){
    // https://media.merriam-webster.com/soundc11
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);
}