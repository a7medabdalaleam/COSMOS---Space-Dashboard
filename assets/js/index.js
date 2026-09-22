let loading=document.getElementById('loading')
let loadingtitle=document.getElementById('loadingtitle')
let loadingd=document.getElementById('apod-date-detail')
let loadingd1=document.getElementById('apod-date-detail1')

async function getTodayInSpace() {
    loading.classList.remove('hidden')
    loadingtitle.classList.remove('hidden')
    loadingd.classList.remove('hidden')
    loadingd1.classList.remove('hidden')
    let response=await fetch('https://science.nasa.gov/wp-json/wp/v2/apod-basic')
    if(response.ok){
        let data=await response.json();
          getShowTodaySpace(data);
        loading.classList.add('hidden')
        loadingtitle.classList.add('hidden')
        loadingd.classList.add('hidden')
        loadingd1.classList.add('hidden')
        
    }
}
getTodayInSpace()

function getShowTodaySpace(arrData){
    let apoddate=document.getElementById('apod-date')
  let cartona1=`
    Astronomy Picture of the Day - ${arrData[0].date?arrData[0].date:'loading'}
   `
   apoddate.innerHTML=cartona1;
let dateblok=document.getElementById('dateblok');
let cartona2=`
${arrData[0].date}
`
dateblok.innerHTML=cartona2
let apodtitle=document.getElementById('apod-title')
let cartona3=`
${arrData[0].title}
`
apodtitle.innerHTML=cartona3
let apoddatedetail=document.getElementById('data-loadin');
apoddatedetail.innerHTML=cartona2
let apoddatedetail1=document.getElementById('data-loadi');
apoddatedetail1.innerHTML=cartona2
let apodexplanation=document.getElementById('apod-explanation')
let cartona4=
`
${arrData[0].explanation}
`
apodexplanation.innerHTML=cartona4
}

let todayINSpace=document.getElementById('todayINSpace')
let launch=document.getElementById('launch')
let planet=document.getElementById('planet')
let sections=document.querySelectorAll('section')
const navButtons = [todayINSpace, launch, planet];

const activeClasses = ['bg-blue-500/10', 'text-blue-400'];
const inactiveClasses = ['text-slate-300', 'hover:bg-slate-800'];

function setActiveButton(activeBtn, sectionIndex) {
    
    sections.forEach(section => section.classList.add('hidden'));
    sections[sectionIndex].classList.remove('hidden');

   
    navButtons.forEach(btn => {
        btn.classList.remove(...activeClasses);
        btn.classList.add(...inactiveClasses);
    });

   
    activeBtn.classList.remove(...inactiveClasses);
    activeBtn.classList.add(...activeClasses);
}

todayINSpace.addEventListener('click', () => setActiveButton(todayINSpace, 0));
launch.addEventListener('click', () => setActiveButton(launch, 1));
planet.addEventListener('click', () => setActiveButton(planet, 2));

async function getLunch(){
    let response=await fetch('https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?format=json&limit=10');
    if(response.ok){
        document.getElementById('apod-loading').classList.remove('hidden')
        let data= await response.json()
        getshowLunch(data.results)
        document.getElementById('apod-loading').classList.add('hidden')
        document.getElementById('apod-image').classList.remove('hidden')
        getLunchGrid(data.results)
    }
}
getLunch()
function getshowLunch(arr){
document.getElementById('gospan').innerHTML=`${arr[0].status.abbrev}`;
document.getElementById('titleLunch').innerHTML=`${arr[0].name}`;
document.getElementById('lunchServiseProvider').innerHTML=`${arr[0].launch_service_provider.name}`;
document.getElementById('rocketName').innerHTML=`${arr[0].rocket.configuration.name}`;
let net = arr[0].net;
let [date, time] = net.split('T');
document.getElementById('launchDate').innerHTML=`${date}`;
document.getElementById('launchTime').innerHTML=`${time}`;
document.getElementById('lacationLunch').innerHTML=`${arr[0].pad.location.name}`;
document.getElementById('countryLunch').innerHTML=`${arr[0].pad.country.name}`;
document.getElementById('descriptionLunch').innerHTML=`${arr[0].mission.description}`;
document.getElementById('imglunch').setAttribute('src',`${arr[2].image.image_url}`);
document.getElementById('apod-image').setAttribute('src',`${arr[2].image.image_url}`);
document.getElementById('apod-image').setAttribute('alt',`${arr[2].name}`);
document.getElementById('fullView').addEventListener('click',function(){
    window.open(`${arr[2].image.image_url}`)
})
}

function getLunchGrid(arr){
    cartona='';
    for(let i=0;i<arr.length;i++){
        let net = arr[i].net;
let [date, time] = net.split('T');
        cartona+=`
         <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <img class='h-full w-full' src="${arr[i].image.image_url}" alt="${arr[i].name}">
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${arr[i].status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${arr[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${arr[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${date}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${time}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${arr[i].rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${arr[i].pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
        `
    }
    document.getElementById('launches-grid').innerHTML=cartona
}
function formatNumber(num) {
    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1) + 'B';
    }
    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + 'M';
    }
    if (num >= 1_000) {
        return (num / 1_000).toFixed(1) + 'K';
    }
    return num.toString();
}
async function getPlanets(){
    let response=await fetch('https://solar-system-opendata-proxy.vercel.app/api/planets')
    if(response.ok){
        let data=await response.json()
        let mercuryPlanet=document.getElementById('mercuryPlanet');
        let venusPlanet=document.getElementById('venusPlanet');
        let EarthPlanet=document.getElementById('EarthPlanet');
        let marsPlanet=document.getElementById('marsPlanet');
        let JupiterPlanet=document.getElementById('JupiterPlanet');
        let SaturnPlanet=document.getElementById('SaturnPlanet');
        let UranusPlanet=document.getElementById('UranusPlanet');
        let NeptunePlanet=document.getElementById('NeptunePlanet');
        let planetContainer=document.getElementById('planetContainer')
        let discoINfo=document.getElementById('discoINfo')
        mercuryPlanet.addEventListener('click',function(){
            planetContainer.innerHTML=`
             <div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="${data.bodies[4].image}"
                    alt="earth planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      ${data.bodies[4].name}
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                    ${data.bodies[4].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    ${formatNumber(data.bodies[4].semimajorAxis)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[4].meanRadius)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                   ${data.bodies[4].mass.massValue}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[4].density)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${data.bodies[4].sideralOrbit} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${data.bodies[4].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">
                  ${data.bodies[4].moons===null?'0':''}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${data.bodies[4].gravity} m/s²
                  </p>
                </div>
              </div>
            `
            let planet=data.bodies[4]
            discoINfo.innerHTML=`
            <div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-user-astronaut text-purple-400 mr-2"></i> 
    Discovery Info 
  </h4>

  <div class="space-y-3 text-sm"> 

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovered By</span> 
      <span class="font-semibold text-right">
        ${planet.discoveredBy || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovery Date</span> 
      <span class="font-semibold">
        ${planet.discoveryDate || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Body Type</span> 
      <span class="font-semibold">
        ${planet.bodyType || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Volume</span> 
      <span class="font-semibold">
        ${
          planet.vol
            ? `${planet.vol.volValue} × 10<sup>${planet.vol.volExponent}</sup> km³`
            : 'N/A'
        }
      </span> 
    </div>

  </div> 
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-lightbulb text-yellow-400 mr-2"></i> 
    Quick Facts 
  </h4>

  <ul class="space-y-3 text-sm">

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        ${planet.type || planet.bodyType}
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Surface gravity: ${planet.gravity} m/s²
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Density: ${planet.density} g/cm³
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Axial tilt: ${planet.axialTilt}°
      </span>
    </li>

  </ul>
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-satellite text-blue-400 mr-2"></i> 
    Orbital Characteristics 
  </h4>

  <div class="space-y-3 text-sm">

    <!-- Perihelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Perihelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.perihelion / 1000000)}M km
      </span> 
    </div>

    <!-- Aphelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Aphelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.aphelion / 1000000)}M km
      </span> 
    </div>

    <!-- Eccentricity -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Eccentricity</span> 
      <span class="font-semibold">
        ${planet.eccentricity}
      </span> 
    </div>

    <!-- Inclination -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Inclination</span> 
      <span class="font-semibold">
        ${planet.inclination}°
      </span> 
    </div>

    <!-- Axial Tilt -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Axial Tilt</span> 
      <span class="font-semibold">
        ${planet.axialTilt}°
      </span> 
    </div>

    <!-- Average Temperature -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Avg Temperature</span> 
      <span class="font-semibold">
        ${planet.avgTemp === 0 ? 'N/A' : `${planet.avgTemp}°C`}
      </span> 
    </div>

    <!-- Escape Velocity -->
    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Escape Velocity</span> 
      <span class="font-semibold">
        ${(planet.escape / 1000).toFixed(2)} km/s
      </span> 
    </div>

  </div> 
</div>
            `
        })
        venusPlanet.addEventListener('click',function(){
            planetContainer.innerHTML=`
             <div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="${data.bodies[7].image}"
                    alt="earth planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      ${data.bodies[7].name}
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                    ${data.bodies[7].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    ${formatNumber(data.bodies[7].semimajorAxis)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[7].meanRadius)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                   ${data.bodies[7].mass.massValue}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[7].density)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${data.bodies[7].sideralOrbit} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${data.bodies[7].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">
                  ${data.bodies[7].moons===null?'0':''}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${data.bodies[7].gravity} m/s²
                  </p>
                </div>
              </div>
            `
            let planet=data.bodies[7]
            discoINfo.innerHTML=`
            <div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-user-astronaut text-purple-400 mr-2"></i> 
    Discovery Info 
  </h4>

  <div class="space-y-3 text-sm"> 

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovered By</span> 
      <span class="font-semibold text-right">
        ${planet.discoveredBy || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovery Date</span> 
      <span class="font-semibold">
        ${planet.discoveryDate || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Body Type</span> 
      <span class="font-semibold">
        ${planet.bodyType || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Volume</span> 
      <span class="font-semibold">
        ${
          planet.vol
            ? `${planet.vol.volValue} × 10<sup>${planet.vol.volExponent}</sup> km³`
            : 'N/A'
        }
      </span> 
    </div>

  </div> 
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-lightbulb text-yellow-400 mr-2"></i> 
    Quick Facts 
  </h4>

  <ul class="space-y-3 text-sm">

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        ${planet.type || planet.bodyType}
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Surface gravity: ${planet.gravity} m/s²
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Density: ${planet.density} g/cm³
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Axial tilt: ${planet.axialTilt}°
      </span>
    </li>

  </ul>
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-satellite text-blue-400 mr-2"></i> 
    Orbital Characteristics 
  </h4>

  <div class="space-y-3 text-sm">

    <!-- Perihelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Perihelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.perihelion / 1000000)}M km
      </span> 
    </div>

    <!-- Aphelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Aphelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.aphelion / 1000000)}M km
      </span> 
    </div>

    <!-- Eccentricity -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Eccentricity</span> 
      <span class="font-semibold">
        ${planet.eccentricity}
      </span> 
    </div>

    <!-- Inclination -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Inclination</span> 
      <span class="font-semibold">
        ${planet.inclination}°
      </span> 
    </div>

    <!-- Axial Tilt -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Axial Tilt</span> 
      <span class="font-semibold">
        ${planet.axialTilt}°
      </span> 
    </div>

    <!-- Average Temperature -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Avg Temperature</span> 
      <span class="font-semibold">
        ${planet.avgTemp === 0 ? 'N/A' : `${planet.avgTemp}°C`}
      </span> 
    </div>

    <!-- Escape Velocity -->
    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Escape Velocity</span> 
      <span class="font-semibold">
        ${(planet.escape / 1000).toFixed(2)} km/s
      </span> 
    </div>

  </div> 
</div>
            `
        })
        EarthPlanet.addEventListener('click',function(){
            planetContainer.innerHTML=`
             <div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="${data.bodies[6].image}"
                    alt="earth planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      ${data.bodies[6].name}
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                    ${data.bodies[6].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    ${formatNumber(data.bodies[6].semimajorAxis)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[6].meanRadius)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                   ${data.bodies[6].mass.massValue}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[6].density)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${data.bodies[6].sideralOrbit} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${data.bodies[6].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">
                  ${data.bodies[6].moons===null?'0':'1'}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${data.bodies[6].gravity} m/s²
                  </p>
                </div>
              </div>
            `
            let planet=data.bodies[6]
            discoINfo.innerHTML=`
            <div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-user-astronaut text-purple-400 mr-2"></i> 
    Discovery Info 
  </h4>

  <div class="space-y-3 text-sm"> 

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovered By</span> 
      <span class="font-semibold text-right">
        ${planet.discoveredBy || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovery Date</span> 
      <span class="font-semibold">
        ${planet.discoveryDate || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Body Type</span> 
      <span class="font-semibold">
        ${planet.bodyType || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Volume</span> 
      <span class="font-semibold">
        ${
          planet.vol
            ? `${planet.vol.volValue} × 10<sup>${planet.vol.volExponent}</sup> km³`
            : 'N/A'
        }
      </span> 
    </div>

  </div> 
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-lightbulb text-yellow-400 mr-2"></i> 
    Quick Facts 
  </h4>

  <ul class="space-y-3 text-sm">

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        ${planet.type || planet.bodyType}
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Surface gravity: ${planet.gravity} m/s²
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Density: ${planet.density} g/cm³
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Axial tilt: ${planet.axialTilt}°
      </span>
    </li>

  </ul>
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-satellite text-blue-400 mr-2"></i> 
    Orbital Characteristics 
  </h4>

  <div class="space-y-3 text-sm">

    <!-- Perihelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Perihelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.perihelion / 1000000)}M km
      </span> 
    </div>

    <!-- Aphelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Aphelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.aphelion / 1000000)}M km
      </span> 
    </div>

    <!-- Eccentricity -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Eccentricity</span> 
      <span class="font-semibold">
        ${planet.eccentricity}
      </span> 
    </div>

    <!-- Inclination -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Inclination</span> 
      <span class="font-semibold">
        ${planet.inclination}°
      </span> 
    </div>

    <!-- Axial Tilt -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Axial Tilt</span> 
      <span class="font-semibold">
        ${planet.axialTilt}°
      </span> 
    </div>

    <!-- Average Temperature -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Avg Temperature</span> 
      <span class="font-semibold">
        ${planet.avgTemp === 0 ? 'N/A' : `${planet.avgTemp}°C`}
      </span> 
    </div>

    <!-- Escape Velocity -->
    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Escape Velocity</span> 
      <span class="font-semibold">
        ${(planet.escape / 1000).toFixed(2)} km/s
      </span> 
    </div>

  </div> 
</div>
            `
        })
        marsPlanet.addEventListener('click',function(){
            planetContainer.innerHTML=`
             <div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="${data.bodies[3].image}"
                    alt="earth planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      ${data.bodies[3].name}
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                    ${data.bodies[3].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    ${formatNumber(data.bodies[3].semimajorAxis)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[3].meanRadius)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                   ${data.bodies[3].mass.massValue}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[3].density)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${data.bodies[3].sideralOrbit} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${data.bodies[3].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">
                  ${data.bodies[3].moons===null?'0':'2'}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${data.bodies[3].gravity} m/s²
                  </p>
                </div>
              </div>
            `
            let planet=data.bodies[3]
            discoINfo.innerHTML=`
            <div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-user-astronaut text-purple-400 mr-2"></i> 
    Discovery Info 
  </h4>

  <div class="space-y-3 text-sm"> 

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovered By</span> 
      <span class="font-semibold text-right">
        ${planet.discoveredBy || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovery Date</span> 
      <span class="font-semibold">
        ${planet.discoveryDate || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Body Type</span> 
      <span class="font-semibold">
        ${planet.bodyType || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Volume</span> 
      <span class="font-semibold">
        ${
          planet.vol
            ? `${planet.vol.volValue} × 10<sup>${planet.vol.volExponent}</sup> km³`
            : 'N/A'
        }
      </span> 
    </div>

  </div> 
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-lightbulb text-yellow-400 mr-2"></i> 
    Quick Facts 
  </h4>

  <ul class="space-y-3 text-sm">

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        ${planet.type || planet.bodyType}
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Surface gravity: ${planet.gravity} m/s²
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Density: ${planet.density} g/cm³
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Axial tilt: ${planet.axialTilt}°
      </span>
    </li>

  </ul>
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-satellite text-blue-400 mr-2"></i> 
    Orbital Characteristics 
  </h4>

  <div class="space-y-3 text-sm">

    <!-- Perihelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Perihelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.perihelion / 1000000)}M km
      </span> 
    </div>

    <!-- Aphelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Aphelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.aphelion / 1000000)}M km
      </span> 
    </div>

    <!-- Eccentricity -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Eccentricity</span> 
      <span class="font-semibold">
        ${planet.eccentricity}
      </span> 
    </div>

    <!-- Inclination -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Inclination</span> 
      <span class="font-semibold">
        ${planet.inclination}°
      </span> 
    </div>

    <!-- Axial Tilt -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Axial Tilt</span> 
      <span class="font-semibold">
        ${planet.axialTilt}°
      </span> 
    </div>

    <!-- Average Temperature -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Avg Temperature</span> 
      <span class="font-semibold">
        ${planet.avgTemp === 0 ? 'N/A' : `${planet.avgTemp}°C`}
      </span> 
    </div>

    <!-- Escape Velocity -->
    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Escape Velocity</span> 
      <span class="font-semibold">
        ${(planet.escape / 1000).toFixed(2)} km/s
      </span> 
    </div>

  </div> 
</div>
            `
        })
        JupiterPlanet.addEventListener('click',function(){
            planetContainer.innerHTML=`
             <div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="${data.bodies[2].image}"
                    alt="earth planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      ${data.bodies[2].name}
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                    ${data.bodies[2].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    ${formatNumber(data.bodies[2].semimajorAxis)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[2].meanRadius)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                   ${data.bodies[2].mass.massValue}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[2].density)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${data.bodies[2].sideralOrbit} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${data.bodies[2].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">
                  ${data.bodies[2].moons===null?'0':'115'}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${data.bodies[2].gravity} m/s²
                  </p>
                </div>
              </div>
            `
            let planet=data.bodies[2]
            discoINfo.innerHTML=`
            <div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-user-astronaut text-purple-400 mr-2"></i> 
    Discovery Info 
  </h4>

  <div class="space-y-3 text-sm"> 

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovered By</span> 
      <span class="font-semibold text-right">
        ${planet.discoveredBy || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovery Date</span> 
      <span class="font-semibold">
        ${planet.discoveryDate || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Body Type</span> 
      <span class="font-semibold">
        ${planet.bodyType || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Volume</span> 
      <span class="font-semibold">
        ${
          planet.vol
            ? `${planet.vol.volValue} × 10<sup>${planet.vol.volExponent}</sup> km³`
            : 'N/A'
        }
      </span> 
    </div>

  </div> 
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-lightbulb text-yellow-400 mr-2"></i> 
    Quick Facts 
  </h4>

  <ul class="space-y-3 text-sm">

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        ${planet.type || planet.bodyType}
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Surface gravity: ${planet.gravity} m/s²
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Density: ${planet.density} g/cm³
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Axial tilt: ${planet.axialTilt}°
      </span>
    </li>

  </ul>
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-satellite text-blue-400 mr-2"></i> 
    Orbital Characteristics 
  </h4>

  <div class="space-y-3 text-sm">

    <!-- Perihelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Perihelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.perihelion / 1000000)}M km
      </span> 
    </div>

    <!-- Aphelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Aphelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.aphelion / 1000000)}M km
      </span> 
    </div>

    <!-- Eccentricity -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Eccentricity</span> 
      <span class="font-semibold">
        ${planet.eccentricity}
      </span> 
    </div>

    <!-- Inclination -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Inclination</span> 
      <span class="font-semibold">
        ${planet.inclination}°
      </span> 
    </div>

    <!-- Axial Tilt -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Axial Tilt</span> 
      <span class="font-semibold">
        ${planet.axialTilt}°
      </span> 
    </div>

    <!-- Average Temperature -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Avg Temperature</span> 
      <span class="font-semibold">
        ${planet.avgTemp === 0 ? 'N/A' : `${planet.avgTemp}°C`}
      </span> 
    </div>

    <!-- Escape Velocity -->
    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Escape Velocity</span> 
      <span class="font-semibold">
        ${(planet.escape / 1000).toFixed(2)} km/s
      </span> 
    </div>

  </div> 
</div>
            `
        })
        SaturnPlanet.addEventListener('click',function(){
            planetContainer.innerHTML=`
             <div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="${data.bodies[5].image}"
                    alt="earth planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      ${data.bodies[5].name}
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                    ${data.bodies[5].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    ${formatNumber(data.bodies[5].semimajorAxis)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[5].meanRadius)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                   ${data.bodies[5].mass.massValue}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[5].density)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${data.bodies[5].sideralOrbit} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${data.bodies[5].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">
                  ${data.bodies[5].moons===null?'0':'293'}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${data.bodies[5].gravity} m/s²
                  </p>
                </div>
              </div>
            `
            let planet=data.bodies[5]
            discoINfo.innerHTML=`
            <div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-user-astronaut text-purple-400 mr-2"></i> 
    Discovery Info 
  </h4>

  <div class="space-y-3 text-sm"> 

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovered By</span> 
      <span class="font-semibold text-right">
        ${planet.discoveredBy || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovery Date</span> 
      <span class="font-semibold">
        ${planet.discoveryDate || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Body Type</span> 
      <span class="font-semibold">
        ${planet.bodyType || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Volume</span> 
      <span class="font-semibold">
        ${
          planet.vol
            ? `${planet.vol.volValue} × 10<sup>${planet.vol.volExponent}</sup> km³`
            : 'N/A'
        }
      </span> 
    </div>

  </div> 
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-lightbulb text-yellow-400 mr-2"></i> 
    Quick Facts 
  </h4>

  <ul class="space-y-3 text-sm">

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        ${planet.type || planet.bodyType}
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Surface gravity: ${planet.gravity} m/s²
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Density: ${planet.density} g/cm³
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Axial tilt: ${planet.axialTilt}°
      </span>
    </li>

  </ul>
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-satellite text-blue-400 mr-2"></i> 
    Orbital Characteristics 
  </h4>

  <div class="space-y-3 text-sm">

    <!-- Perihelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Perihelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.perihelion / 1000000)}M km
      </span> 
    </div>

    <!-- Aphelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Aphelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.aphelion / 1000000)}M km
      </span> 
    </div>

    <!-- Eccentricity -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Eccentricity</span> 
      <span class="font-semibold">
        ${planet.eccentricity}
      </span> 
    </div>

    <!-- Inclination -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Inclination</span> 
      <span class="font-semibold">
        ${planet.inclination}°
      </span> 
    </div>

    <!-- Axial Tilt -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Axial Tilt</span> 
      <span class="font-semibold">
        ${planet.axialTilt}°
      </span> 
    </div>

    <!-- Average Temperature -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Avg Temperature</span> 
      <span class="font-semibold">
        ${planet.avgTemp === 0 ? 'N/A' : `${planet.avgTemp}°C`}
      </span> 
    </div>

    <!-- Escape Velocity -->
    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Escape Velocity</span> 
      <span class="font-semibold">
        ${(planet.escape / 1000).toFixed(2)} km/s
      </span> 
    </div>

  </div> 
</div>
            `
        })
        UranusPlanet.addEventListener('click',function(){
            planetContainer.innerHTML=`
             <div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="${data.bodies[0].image}"
                    alt="earth planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      ${data.bodies[0].name}
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                    ${data.bodies[0].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    ${formatNumber(data.bodies[0].semimajorAxis)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[0].meanRadius)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                   ${data.bodies[0].mass.massValue}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[0].density)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${data.bodies[0].sideralOrbit} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${data.bodies[0].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">
                  ${data.bodies[0].moons===null?'0':'29'}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${data.bodies[0].gravity} m/s²
                  </p>
                </div>
              </div>
            `
            let planet=data.bodies[0]
            discoINfo.innerHTML=`
            <div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-user-astronaut text-purple-400 mr-2"></i> 
    Discovery Info 
  </h4>

  <div class="space-y-3 text-sm"> 

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovered By</span> 
      <span class="font-semibold text-right">
        ${planet.discoveredBy || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovery Date</span> 
      <span class="font-semibold">
        ${planet.discoveryDate || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Body Type</span> 
      <span class="font-semibold">
        ${planet.bodyType || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Volume</span> 
      <span class="font-semibold">
        ${
          planet.vol
            ? `${planet.vol.volValue} × 10<sup>${planet.vol.volExponent}</sup> km³`
            : 'N/A'
        }
      </span> 
    </div>

  </div> 
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-lightbulb text-yellow-400 mr-2"></i> 
    Quick Facts 
  </h4>

  <ul class="space-y-3 text-sm">

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        ${planet.type || planet.bodyType}
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Surface gravity: ${planet.gravity} m/s²
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Density: ${planet.density} g/cm³
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Axial tilt: ${planet.axialTilt}°
      </span>
    </li>

  </ul>
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-satellite text-blue-400 mr-2"></i> 
    Orbital Characteristics 
  </h4>

  <div class="space-y-3 text-sm">

    <!-- Perihelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Perihelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.perihelion / 1000000)}M km
      </span> 
    </div>

    <!-- Aphelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Aphelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.aphelion / 1000000)}M km
      </span> 
    </div>

    <!-- Eccentricity -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Eccentricity</span> 
      <span class="font-semibold">
        ${planet.eccentricity}
      </span> 
    </div>

    <!-- Inclination -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Inclination</span> 
      <span class="font-semibold">
        ${planet.inclination}°
      </span> 
    </div>

    <!-- Axial Tilt -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Axial Tilt</span> 
      <span class="font-semibold">
        ${planet.axialTilt}°
      </span> 
    </div>

    <!-- Average Temperature -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Avg Temperature</span> 
      <span class="font-semibold">
        ${planet.avgTemp === 0 ? 'N/A' : `${planet.avgTemp}°C`}
      </span> 
    </div>

    <!-- Escape Velocity -->
    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Escape Velocity</span> 
      <span class="font-semibold">
        ${(planet.escape / 1000).toFixed(2)} km/s
      </span> 
    </div>

  </div> 
</div>
            `
        })
        NeptunePlanet.addEventListener('click',function(){
            planetContainer.innerHTML=`
             <div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="${data.bodies[1].image}"
                    alt="earth planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      ${data.bodies[1].name}
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                    ${data.bodies[1].description}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    ${formatNumber(data.bodies[1].semimajorAxis)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[1].meanRadius)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                   ${data.bodies[1].mass.massValue}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${formatNumber(data.bodies[1].density)}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${data.bodies[1].sideralOrbit} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${data.bodies[1].sideralRotation} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">
                  ${data.bodies[1].moons===null?'0':'16'}
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${data.bodies[1].gravity} m/s²
                  </p>
                </div>
              </div>
            `
            let planet=data.bodies[1]
            discoINfo.innerHTML=`
            <div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-user-astronaut text-purple-400 mr-2"></i> 
    Discovery Info 
  </h4>

  <div class="space-y-3 text-sm"> 

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovered By</span> 
      <span class="font-semibold text-right">
        ${planet.discoveredBy || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Discovery Date</span> 
      <span class="font-semibold">
        ${planet.discoveryDate || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Body Type</span> 
      <span class="font-semibold">
        ${planet.bodyType || 'N/A'}
      </span> 
    </div>

    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Volume</span> 
      <span class="font-semibold">
        ${
          planet.vol
            ? `${planet.vol.volValue} × 10<sup>${planet.vol.volExponent}</sup> km³`
            : 'N/A'
        }
      </span> 
    </div>

  </div> 
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-lightbulb text-yellow-400 mr-2"></i> 
    Quick Facts 
  </h4>

  <ul class="space-y-3 text-sm">

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        ${planet.type || planet.bodyType}
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Surface gravity: ${planet.gravity} m/s²
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Density: ${planet.density} g/cm³
      </span>
    </li>

    <li class="flex items-start">
      <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
      <span class="text-slate-300">
        Axial tilt: ${planet.axialTilt}°
      </span>
    </li>

  </ul>
</div>
<div 
  class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6" 
>
  <h4 class="font-semibold mb-4 flex items-center"> 
    <i class="fas fa-satellite text-blue-400 mr-2"></i> 
    Orbital Characteristics 
  </h4>

  <div class="space-y-3 text-sm">

    <!-- Perihelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Perihelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.perihelion / 1000000)}M km
      </span> 
    </div>

    <!-- Aphelion -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Aphelion</span> 
      <span class="font-semibold">
        ${formatNumber(planet.aphelion / 1000000)}M km
      </span> 
    </div>

    <!-- Eccentricity -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Eccentricity</span> 
      <span class="font-semibold">
        ${planet.eccentricity}
      </span> 
    </div>

    <!-- Inclination -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Inclination</span> 
      <span class="font-semibold">
        ${planet.inclination}°
      </span> 
    </div>

    <!-- Axial Tilt -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Axial Tilt</span> 
      <span class="font-semibold">
        ${planet.axialTilt}°
      </span> 
    </div>

    <!-- Average Temperature -->
    <div class="flex justify-between items-center py-2 border-b border-slate-700"> 
      <span class="text-slate-400">Avg Temperature</span> 
      <span class="font-semibold">
        ${planet.avgTemp === 0 ? 'N/A' : `${planet.avgTemp}°C`}
      </span> 
    </div>

    <!-- Escape Velocity -->
    <div class="flex justify-between items-center py-2"> 
      <span class="text-slate-400">Escape Velocity</span> 
      <span class="font-semibold">
        ${(planet.escape / 1000).toFixed(2)} km/s
      </span> 
    </div>

  </div> 
</div>
            `
        })
        
    }
}
 getPlanets()