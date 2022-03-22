const form = document.querySelector('form')
const pokeImg = document.querySelector('[data-poke-img]')
const pokeName = document.querySelector('[data-poke-name]')
const pokeId = document.querySelector('[data-poke-id]')
const pokeTypes = document.querySelector('[data-poke-types]')
const pokeStats = document.querySelector('[data-poke-stats]')


const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    dark: '#000',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

form.addEventListener('submit', function (e) {
    e.preventDefault()
    const { value } = e.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`).
        then(res => res.json()).then(res => renderData(res))
        .catch( _ => renderNotFound())
})

const renderNotFound = ()=>{
    pokeName.textContent = 'No encontrado'
    pokeImg.setAttribute('src' , './poke-shadow.png')
    pokeStats.innerHTML = ''
    pokeTypes.innerHTML = ''
    pokeId.textContent = ''
    pokeImg.style.background = 'white'
}


const renderData = (pokemon) => {
    console.log(pokemon)
    const { id, stats, name, types, sprites: { front_default } } = pokemon;
    pokeImg.setAttribute('src', front_default)
    const color1 = typeColors[types[0].type.name];
    const color2 = types[1] ? typeColors[types[1].type.name] : typeColors.default
    console.log(color1)
    pokeImg.style.background = `radial-gradient( ${color2} 33% , ${color1} 33%)`
    pokeImg.style.backgroundSize = '5px 5px'
    pokeId.textContent = `N° ${id}`;
    pokeName.textContent = name;
    setTypes(types)
    setStats(stats)
}

const setTypes = (types) => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeElementText = document.createElement('div')
        typeElementText.textContent = type.type.name
        typeElementText.style.color = typeColors[type.type.name]
        pokeTypes.appendChild(typeElementText)
    });

}

const setStats = (stats) => {
    pokeStats.innerHTML = ''
    stats.forEach(stat => {
        const statElement = document.createElement('div')
        const statNameElement = document.createElement('div')
        statNameElement.textContent = stat.stat.name;
        const statStatElement = document.createElement('div')
        statStatElement.textContent = stat.base_stat
        statElement.appendChild(statNameElement)
        statElement.appendChild(statStatElement)
        pokeStats.appendChild(statElement)
    })
}