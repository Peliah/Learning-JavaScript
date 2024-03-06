var rain = () =>{
    let cloud = document.querySelector('.cloud');
    let e = document.createElement('div');

    let left = Math.floor(Math.random() * 300)

    e.classList.add('drop');
    cloud.appendChild(e);
    e.style.left = left + 'px'

    setTimeout(
        ()=>{cloud.removeChild(e)}, 2000
    )
}

setInterval(
    ()=>{rain()},20
)