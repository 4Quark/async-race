'use strict'

const carBrand = [
    'Acura', 'Alfa Romeo', 'Alpine', 'Apollo', 'Apple', 'Aston Martin', 'Audi', 'Automobili Pininfarina', 'Bentley', 'BMW', 'Bollinger', 
    'Brilliance', 'Bugatti', 'Buick', 'BYD', 'Cadillac', 'Chana', 'Chery', 'Chevrolet', 'Chrysler', 'Citroen', 'Continental', 'CUPRA',
    'Dacia', 'Daewoo', 'Daihatsu', 'Datsun', 'Detroit Electric', 'Dodge', 'DS Automobiles', 'FAW', 'Ferrari', 'Fiat', 'Fisker', 'Ford',
    'Foxtron', 'Geely', 'Genesis', 'GMC', 'Great Wall', 'Haval', 'Honda', 'Hummer', 'Hyundai', 'Ineos', 'Infiniti', 'Iran Khodro', 'JAC',
    'Jaguar', 'Jeep', 'JETOUR', 'KIA', 'Koenigsegg', 'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'Lexus', 'Lifan', 'Lincoln', 'Lordstown', 
    'Lotus', 'Lucid', 'LvChi', 'Lynk & Co', 'Maserati', 'Maybach', 'Mazda', 'MCLaren', 'Mercedes-Benz', 'MG', 'MINI', 'Mitsubishi', 'Nikola', 
    'NIO', 'Nissan', 'Opel', 'Pagani', 'Peugeot', 'Polestar', 'Porsche', 'Qoros', 'Range Rover', 'Ravon', 'Renault', 'Rimac', 'Rivian',
    'Rolls-Royce', 'Saab', 'Saipa', 'SEAT', 'Skoda', 'smart', 'SsangYong', 'SSC North America', 'Stellantis', 'Subaru', 'Suzuki', 'Tata',
    'Tesla', 'Torsus', 'Toyota', 'VinFast', 'Volkswagen', 'Volvo', 'Xpeng', 'Zotye',
]; 

const carModal = [
    'Durango', 'Ram', 'Challenger', 'Charger', 'Grand Caravan', 'X7', 'X5', 'X3', 'X6 M', 'X6', 'X1', 'X4', 'C3 Aircross', 'C5 Aircross', 'Duster', 'CR-V', 'Corolla',
    'C4 Cactus', 'DS3 Crossback', 'C1', 'C3', 'Berlingo Multispace', 'DS4 Crossback', 'UX 250h', 'NX 300h', 'LC 500', 'RX 350/200t', 'Rapid', 'Largus',
    'IS 200t', 'LS 500h', 'RX', 'ES 200/250/350', 'Hatchback', 'CX-5', 'Sedan', 'CX-30', 'CX-9', 'CX-3', 'MX-5 Roadster', 'Phantom', 'Camry', 'Polo',
    'Cullinan', 'Ghost', 'Dawn', 'Duster', 'Arkana', 'Sandero', 'Logan', 'Trafic Fourgon', 'Logan MCV', 'Captur', 'Kadjar', 'RAV4', 'Rio', 'Creta', 'Solaris',
];  

/* -------------- SERVER -------------- */

const baseURL = 'http://127.0.0.1:3000';

const path = {
    garage: '/garage',
    engine: '/engine',
    winners: '/winners',
};

const generateQueryString = (queryParams = []) => queryParams.length 
    ? `?${queryParams.map(x => `${x.key}=${x.value}`).join('&')}`
    : '';

const getCars = async (queryParams) => {
    const response = await fetch(`${baseURL}${path.garage}${generateQueryString(queryParams)}`);
    const cars = await response.json();
    return cars;
};

const getTotalCountCars = async () => {
    const response = await fetch(`${baseURL}${path.garage}${generateQueryString([{key: '_page', value: '0'}])}`);
    const carCount = Number(response.headers.get('X-Total-Count'));
    return carCount;
};

const getCar = async (id) => {
    const response = await fetch(`${baseURL}${path.garage}/${id}`);
    const car = await response.json();
    return car;
};

const createCar = async (body) => {
    const response = await fetch(`${baseURL}${path.garage}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const car = await response.json();
    return car;
};

const deleteCar = async (id) => {
    const response = await fetch(`${baseURL}${path.garage}/${id}`, {
        method: 'DELETE',
    });
    const car = await response.json();
    return car;
}; 

const updateCar = async (id, body) => {
    const response = await fetch(`${baseURL}${path.garage}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const car = await response.json();
    return car;
};

const updateCarParamater = async (id, body) => {
    const response = await fetch(`${baseURL}${path.garage}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const car = await response.json();
    return car;
};

const engineStart = async (id) => {
    const response = await fetch(`${baseURL}${path.engine}${generateQueryString([{key: 'id', value: id}, {key: 'status', value: 'started'}])}`, {
        method: 'PATCH',
    });
    const car = await response.json()
    return car;
};

const engineStop = async (id) => {
    const response = await fetch(`${baseURL}${path.engine}${generateQueryString([{key: 'id', value: id}, {key: 'status', value: 'stopped'}])}`, {
        method: 'PATCH',
    });
    const car = await response.json();
    return car;
};

const switchEnginetoDrive = async (id) => {
    const response = await fetch(`${baseURL}${path.engine}${generateQueryString([{key: 'id', value: id}, {key: 'status', value: 'drive'}])}`, {
        method: 'PATCH',
    });
    const car = await response.json();
    const success = car.success;
    return success;
};


const getWinners = async (queryParams) => {
    const response = await fetch(`${baseURL}${path.winners}${generateQueryString(queryParams)}`);
    const cars = await response.json();
    return cars;
};

const getTotalCountWinners = async () => {
    const response = await fetch(`${baseURL}${path.winners}${generateQueryString([{key: '_page', value: '0'}])}`);
    const carCount = Number(response.headers.get('X-Total-Count'));
    return carCount;
};

const createWinner = async (body) => {
    const response = await fetch(`${baseURL}${path.winners}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const winner = await response.json();
    return winner;
};

/*
const getWinner = async () => {};
const updateWinner = async () => {};
*/

/* -------------- CHANGE VIEW -------------- */

const BTN_TO_GARAGE = document.querySelector('.to_garage_btn');
const GARAGE = document.querySelector('.garage');
const BTN_TO_WINNERS = document.querySelector('.to_winners_btn');
const WINNERS = document.querySelector('.winners');
BTN_TO_GARAGE.addEventListener('click', () => {
    WINNERS.classList.add('invisible');
    GARAGE.classList.remove('invisible');
});
BTN_TO_WINNERS.addEventListener('click', () => {
    GARAGE.classList.add('invisible');
    WINNERS.classList.remove('invisible');
});

/* -------------- CAR COUNT -------------- */

let totalCarCount = 0;

const GARAGE_HEADER = document.querySelector('.garage_and_count');
const PAGE_TOTAL_GARAGE = document.querySelector('.garage_page_total');

const carCount = async function() {
    totalCarCount = await getTotalCountCars();
    GARAGE_HEADER.innerHTML = `Garage (${totalCarCount})`;
    PAGE_TOTAL_GARAGE.innerHTML = Math.ceil(totalCarCount / 7);
};

/* -------------- WINNERS COUNT -------------- */

let totalWinnersCount = 0;

const PAGE_TOTAL_WINNERS = document.querySelector('.winners_page_total');

const winnersCount = async function() {
    totalWinnersCount = await getTotalCountWinners();
    PAGE_TOTAL_WINNERS.innerHTML = Math.ceil(totalWinnersCount / 10);
};

/* -------------- RENDER CAR -------------- */

function carCreator(newCarName, newCarColor, newCarID) {
    
	const CAR_CARD_HTML = document.createElement('div');
	CAR_CARD_HTML.className = 'car';
    CAR_CARD_HTML.id = `${newCarID}`;
	CAR_CARD_HTML.innerHTML = `
                                <div class="car_settings">
                                    <button class="regular_btn car_btn" id="${newCarID}-select">Update</button>
                                    <button class="regular_btn car_btn" id="${newCarID}-remove">X</button>
                                    <a class="car_name" id="${newCarID}-name">${newCarName}</a>
                                </div>
                                <div class="car_road">
                                    <div class="car_road_top">
                                        <div class="car_road_buttons">
                                            <button class="drive_btn" id="${newCarID}-start">Start</button>
                                            <button class="drive_btn" id="${newCarID}-to-start" disabled>|⇐ </button>
                                        </div>
                                        
                                        <svg class="car_img" id="${newCarID}-pic" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                                            <g><g transform="translate(0.0,511.0) scale(0.10,-0.10)" fill="${newCarColor}"><path d="M4053.6,4997.9c-692.3-121.3-1214.4-637.5-1333.7-1320c-23.5-136.9-29.3-350.1-29.3-1026.7v-856.6l-119.3-41.1c-326.6-109.5-582.8-400.9-655.1-743.1c-45-217.1-84.1-197.5,373.5-197.5h398.9l5.9-2125.7c5.9-2104.2,7.8-2129.7,48.9-2274.4c166.2-584.7,569.1-989.5,1149.9-1157.7c154.5-45,172.1-45,1104.9-45c921.1,0,952.4,1.9,1099.1,43c592.6,172.1,1003.2,590.6,1163.6,1183.2c31.3,111.5,33.2,324.6,39.1,2250.9l7.8,2125.7h400.9h400.9l-11.7,93.9c-56.7,408.7-307,723.6-672.7,846.8l-119.3,41.1v837c0,483-9.8,903.5-21.5,991.5c-86.1,635.6-531.9,1146-1171.4,1337.6c-142.8,43-176,45-1056,48.9C4556.2,5011.6,4104.5,5005.7,4053.6,4997.9z M5659.2,2367.6c385.3-54.7,756.8-160.4,1011.1-287.5c64.5-33.2,121.3-62.6,125.2-66.5c2-2-84.1-275.8-193.6-604.3l-199.5-600.4l-72.3,11.7c-645.4,107.6-2018.2,107.6-2663.6,0l-72.4-11.7l-199.5,600.4c-109.5,328.5-195.6,602.3-193.6,604.3c3.9,3.9,60.6,33.3,125.2,66.5c330.5,164.3,794,275.8,1359.2,324.6C4853.5,2420.4,5459.7,2396.9,5659.2,2367.6z M4147.5-1956.3c555.4-50.8,1451.1-37.1,2014.3,31.3c86.1,11.7,174.1,19.6,197.5,19.6c39.1,0,62.6-54.8,234.7-571c103.7-314.9,193.6-584.7,199.5-598.4c11.7-33.3-310.9-183.8-531.9-248.4c-416.5-119.3-770.5-166.2-1263.3-166.2c-492.8,0-846.8,46.9-1263.3,166.2c-221,64.5-543.7,215.1-531.9,248.4c5.9,13.7,95.8,283.6,201.4,600.4l191.6,575l119.3-13.7C3779.8-1921.1,3975.4-1940.7,4147.5-1956.3z"/></g></g>
                                        </svg>
                                        
                                        <img class="flag_img" src="./assets/flag.png" alt="finish">
                                    </div>
                                    <hr>
                                </div>`;
	document.querySelector('.car_section').append(CAR_CARD_HTML);
    const thisSelect = document.getElementById(`${newCarID}-select`);
    thisSelect.addEventListener('click', () => updateCarFunc(newCarID));
    const thisRemove = document.getElementById(`${newCarID}-remove`);
    thisRemove.addEventListener('click', () => deleteCarFunc(newCarID));
    const thisStartA = document.getElementById(`${newCarID}-start`);
    thisStartA.addEventListener('click', () => moveCar(newCarID));
    const thisToStartB = document.getElementById(`${newCarID}-to-start`);
    thisToStartB.addEventListener('click', () => moveToStart(newCarID));
    
    carCount();
}

/* -------------- RENDER WINNER -------------- */

const winnerCreator = async function (id, wins, time) {
	const WIN_CARD_HTML = document.createElement('tr');
	WIN_CARD_HTML.className = 'winner_row';
    const car = await getCar(id);
	WIN_CARD_HTML.innerHTML = `
                                <td>1</td>
                                <td>
                                    <svg class="small_car_img" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                                        <g><g transform="translate(0.0,511.0) scale(0.10,-0.10)" fill="${car.color}"><path d="M4053.6,4997.9c-692.3-121.3-1214.4-637.5-1333.7-1320c-23.5-136.9-29.3-350.1-29.3-1026.7v-856.6l-119.3-41.1c-326.6-109.5-582.8-400.9-655.1-743.1c-45-217.1-84.1-197.5,373.5-197.5h398.9l5.9-2125.7c5.9-2104.2,7.8-2129.7,48.9-2274.4c166.2-584.7,569.1-989.5,1149.9-1157.7c154.5-45,172.1-45,1104.9-45c921.1,0,952.4,1.9,1099.1,43c592.6,172.1,1003.2,590.6,1163.6,1183.2c31.3,111.5,33.2,324.6,39.1,2250.9l7.8,2125.7h400.9h400.9l-11.7,93.9c-56.7,408.7-307,723.6-672.7,846.8l-119.3,41.1v837c0,483-9.8,903.5-21.5,991.5c-86.1,635.6-531.9,1146-1171.4,1337.6c-142.8,43-176,45-1056,48.9C4556.2,5011.6,4104.5,5005.7,4053.6,4997.9z M5659.2,2367.6c385.3-54.7,756.8-160.4,1011.1-287.5c64.5-33.2,121.3-62.6,125.2-66.5c2-2-84.1-275.8-193.6-604.3l-199.5-600.4l-72.3,11.7c-645.4,107.6-2018.2,107.6-2663.6,0l-72.4-11.7l-199.5,600.4c-109.5,328.5-195.6,602.3-193.6,604.3c3.9,3.9,60.6,33.3,125.2,66.5c330.5,164.3,794,275.8,1359.2,324.6C4853.5,2420.4,5459.7,2396.9,5659.2,2367.6z M4147.5-1956.3c555.4-50.8,1451.1-37.1,2014.3,31.3c86.1,11.7,174.1,19.6,197.5,19.6c39.1,0,62.6-54.8,234.7-571c103.7-314.9,193.6-584.7,199.5-598.4c11.7-33.3-310.9-183.8-531.9-248.4c-416.5-119.3-770.5-166.2-1263.3-166.2c-492.8,0-846.8,46.9-1263.3,166.2c-221,64.5-543.7,215.1-531.9,248.4c5.9,13.7,95.8,283.6,201.4,600.4l191.6,575l119.3-13.7C3779.8-1921.1,3975.4-1940.7,4147.5-1956.3z"/></g></g>
                                    </svg>
                                </td>
                                <td>${car.name}</td>
                                <td>${wins}</td>
                                <td>${time}</td>
                                `;
	document.querySelector('.winners_section').append(WIN_CARD_HTML);
    winnersCount();
}

/* -------------- CHANGE CAR -------------- */

function carChanger(newCarName, newCarColor, carID) {
    const changingCarName = document.getElementById(`${carID}-name`);
    changingCarName.innerHTML = newCarName;
    const changingCarPicture = document.getElementById(`${carID}-pic`);
    changingCarPicture.innerHTML = `<svg class="car_img" id="${carID}-pic" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                                        <g><g transform="translate(0.0,511.0) scale(0.10,-0.10)" fill="${newCarColor}"><path d="M4053.6,4997.9c-692.3-121.3-1214.4-637.5-1333.7-1320c-23.5-136.9-29.3-350.1-29.3-1026.7v-856.6l-119.3-41.1c-326.6-109.5-582.8-400.9-655.1-743.1c-45-217.1-84.1-197.5,373.5-197.5h398.9l5.9-2125.7c5.9-2104.2,7.8-2129.7,48.9-2274.4c166.2-584.7,569.1-989.5,1149.9-1157.7c154.5-45,172.1-45,1104.9-45c921.1,0,952.4,1.9,1099.1,43c592.6,172.1,1003.2,590.6,1163.6,1183.2c31.3,111.5,33.2,324.6,39.1,2250.9l7.8,2125.7h400.9h400.9l-11.7,93.9c-56.7,408.7-307,723.6-672.7,846.8l-119.3,41.1v837c0,483-9.8,903.5-21.5,991.5c-86.1,635.6-531.9,1146-1171.4,1337.6c-142.8,43-176,45-1056,48.9C4556.2,5011.6,4104.5,5005.7,4053.6,4997.9z M5659.2,2367.6c385.3-54.7,756.8-160.4,1011.1-287.5c64.5-33.2,121.3-62.6,125.2-66.5c2-2-84.1-275.8-193.6-604.3l-199.5-600.4l-72.3,11.7c-645.4,107.6-2018.2,107.6-2663.6,0l-72.4-11.7l-199.5,600.4c-109.5,328.5-195.6,602.3-193.6,604.3c3.9,3.9,60.6,33.3,125.2,66.5c330.5,164.3,794,275.8,1359.2,324.6C4853.5,2420.4,5459.7,2396.9,5659.2,2367.6z M4147.5-1956.3c555.4-50.8,1451.1-37.1,2014.3,31.3c86.1,11.7,174.1,19.6,197.5,19.6c39.1,0,62.6-54.8,234.7-571c103.7-314.9,193.6-584.7,199.5-598.4c11.7-33.3-310.9-183.8-531.9-248.4c-416.5-119.3-770.5-166.2-1263.3-166.2c-492.8,0-846.8,46.9-1263.3,166.2c-221,64.5-543.7,215.1-531.9,248.4c5.9,13.7,95.8,283.6,201.4,600.4l191.6,575l119.3-13.7C3779.8-1921.1,3975.4-1940.7,4147.5-1956.3z"/></g></g>
                                    </svg>`;
}

/* -------------- RENDER CARS -------------- */

let currentPageG = 1;

const main = async () => {
    document.querySelectorAll('.car').forEach(el => el.remove());
    const cars = await getCars([{key: '_page', value: currentPageG}, {key: '_limit', value: 7}]); 
    cars.forEach(el => carCreator(el.name, el.color, el.id));
    btnDesabling ();
}

main();

/* -------------- RENDER WINNERS -------------- */

let currentPageW = 1;

const mainWin = async () => {
    document.querySelectorAll('.winner_row').forEach(el => el.remove());
    const winners = await getWinners([{key: '_page', value: currentPageW}, {key: '_limit', value: 10}]); 
    winners.forEach(el => winnerCreator(el.id, el.wins, el.time));
    btnWinnersDesabling();
}

mainWin();

/* -------------- PAGINATION GARAGE -------------- */

const PAGE_NUMBER_GARAGE = document.querySelector('.garage_page');
const PAGE_PREVIOUS_GARAGE = document.querySelector('.garage_page_prev');
const PAGE_NEXT_GARAGE = document.querySelector('.garage_page_next');
const PAGE_CURRENT_GARAGE = document.querySelector('.garage_page_current');

async function btnDesabling () {
    totalCarCount = await getTotalCountCars();

    if (currentPageG == 1) {
        PAGE_PREVIOUS_GARAGE.disabled = true;
    } else PAGE_PREVIOUS_GARAGE.disabled = false;

    if ((totalCarCount < 7) || (currentPageG == Math.ceil(totalCarCount / 7))) {
        PAGE_NEXT_GARAGE.disabled = true;
    } else PAGE_NEXT_GARAGE.disabled = false;
}

PAGE_PREVIOUS_GARAGE.addEventListener('click', () => {
    currentPageG -= 1;
    main();
    PAGE_NUMBER_GARAGE.innerHTML = 'Page #' + currentPageG;
    PAGE_CURRENT_GARAGE.innerHTML = currentPageG;
    btnDesabling();
});

PAGE_NEXT_GARAGE.addEventListener('click', () => {
    currentPageG += 1;
    main();
    PAGE_NUMBER_GARAGE.innerHTML = 'Page #' + currentPageG;
    PAGE_CURRENT_GARAGE.innerHTML = currentPageG;
    btnDesabling();
});

/* -------------- PAGINATION WINNERS -------------- */

const PAGE_NUMBER_WINNERS = document.querySelector('.winners_page');
const PAGE_PREVIOUS_WINNERS = document.querySelector('.winners_page_prev');
const PAGE_NEXT_WINNERS = document.querySelector('.winners_page_next');
const PAGE_CURRENT_WINNERS = document.querySelector('.winners_page_current');

async function btnWinnersDesabling () {
    totalWinnersCount = await getTotalCountWinners();

    if (currentPageW == 1) {
        PAGE_PREVIOUS_WINNERS.disabled = true;
    } else PAGE_PREVIOUS_WINNERS.disabled = false;

    if ((totalWinnersCount < 7) || (currentPageW == Math.ceil(totalWinnersCount / 10))) {
        PAGE_NEXT_WINNERS.disabled = true;
    } else PAGE_NEXT_WINNERS.disabled = false;
}

PAGE_PREVIOUS_WINNERS.addEventListener('click', () => {
    currentPageW -= 1;
    mainWin();
    PAGE_NUMBER_WINNERS.innerHTML = 'Page #' + currentPageW;
    PAGE_CURRENT_WINNERS.innerHTML = currentPageW;
    btnWinnersDesabling();
});

PAGE_NEXT_WINNERS.addEventListener('click', () => {
    currentPageW += 1;
    mainWin();
    PAGE_NUMBER_WINNERS.innerHTML = 'Page #' + currentPageW;
    PAGE_CURRENT_WINNERS.innerHTML = currentPageW;
    btnWinnersDesabling();
});

/* -------------- CREATE NEW CAR -------------- */

const BTN_CREATE_CAR = document.querySelector('.create_btn');
const INPUT_CREATE_CAR = document.querySelector('.create_input');
const COLOR_CREATE_CAR = document.querySelector('.create_color');

BTN_CREATE_CAR.addEventListener('click', async () => {
    let newCarName;
    if (INPUT_CREATE_CAR.value == '') {
        newCarName = carBrand[Math.floor(Math.random()*107)] + ' ' + carModal[Math.floor(Math.random()*58)]; 
    } else newCarName = INPUT_CREATE_CAR.value;
    
    const newCarColor = COLOR_CREATE_CAR.value;
    await createCar({
        name: newCarName,
        color: newCarColor,
    });
    main();
    INPUT_CREATE_CAR.value = '';  
    carCount();
});

/* -------------- GENERATE 100 NEW CARS -------------- */

const GENERATE_BTN = document.querySelector('.generate_btn');
GENERATE_BTN.addEventListener('click', async () => {
    for (let i = 0; i < 100; i++) {
        const newCarName = carBrand[Math.floor(Math.random()*107)] + ' ' + carModal[Math.floor(Math.random()*58)]; 
        const newCarColor = `#${Math.floor(Math.random()*256).toString(16)}${Math.floor(Math.random()*256).toString(16)}${Math.floor(Math.random()*256).toString(16)}`;
        await createCar({
            name: newCarName,
            color: newCarColor,
        });
    }
    main();
    carCount();
});

/* -------------- DELETE CAR -------------- */

const deleteCarFunc = async (id) => {
    await deleteCar(id);
    document.getElementById(id).remove();
    main();
    carCount();
}; 

/* -------------- UPDATE CAR -------------- */

const INPUT_CHANGE_CAR = document.querySelector('.change_input');
const COLOR_CHANGE_CAR = document.querySelector('.change_color');
const BTN_CHANGE_CAR = document.querySelector('.update_btn');
BTN_CHANGE_CAR.disabled = true;

const updateCarFunc = async (id) => {
    const SELECTED_BTN = document.getElementById(`${id}-select`);
    const car = await getCar(id);
    if (document.getElementsByClassName('active').length > 0) {
        if (SELECTED_BTN.classList.contains('active')) {
            SELECTED_BTN.classList.remove('active');
            BTN_CHANGE_CAR.disabled = true;
            INPUT_CHANGE_CAR.value = '';
        } else {
            document.querySelector('.active').classList.remove('active');
            SELECTED_BTN.classList.add('active');
            BTN_CHANGE_CAR.disabled = false;
            INPUT_CHANGE_CAR.value = car.name; 
            COLOR_CHANGE_CAR.value = car.color;
        }
    } else {
        SELECTED_BTN.classList.add('active');
        BTN_CHANGE_CAR.disabled = false;
        INPUT_CHANGE_CAR.value = car.name; 
        COLOR_CHANGE_CAR.value = car.color;
    }
};

BTN_CHANGE_CAR.addEventListener('click', async () => {
    const newCarName = INPUT_CHANGE_CAR.value;
    const newCarColor = COLOR_CHANGE_CAR.value;
    const carToChange = document.querySelector('.active');
    const id = Number(carToChange.id.replace('-select', ''));
    await updateCar(id, {
        name: newCarName,
        color: newCarColor,
    });
    carChanger(newCarName, newCarColor, id);
    BTN_CHANGE_CAR.disabled = true;
    document.getElementById(`${id}-select`).classList.remove('active');
    INPUT_CHANGE_CAR.value = ''; 
});

/* -------------- MOVING -------------- */

const moveCar = async function (id) {
    const WINDOW_WIDTH = document.documentElement.clientWidth;
    document.getElementById(`${id}-start`).disabled = true;
    document.getElementById(`${id}-to-start`).disabled = false;

    const car = await engineStart(id);
    const time = car.distance / car.velocity ;
    const carToMove = document.getElementById(`${id}-pic`);

    let start = null;
    const state = {};
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start; 
        const dist = WINDOW_WIDTH - 200;
        const passed = Math.round(progress * (dist / time))
        carToMove.style.transform = 'rotate(90deg) translateY(-' + Math.min(passed, dist) + 'px)';
        if (passed < dist) {
            state.id = window.requestAnimationFrame(step);
        }
    }
    state.id = window.requestAnimationFrame(step);

    try {
        const {success} = await switchEnginetoDrive(id);
        if (!success) window.cancelAnimationFrame(state.id);
    } catch {
        console.log('some error');
    } 
    
    return time;
}

/* -------------- COME BACK -------------- */

const moveToStart = async function (id) {
    document.getElementById(`${id}-start`).disabled = false;
    document.getElementById(`${id}-to-start`).disabled = true;
    await engineStop(id);
    const carToMove = document.getElementById(`${id}-pic`);
    carToMove.style.transform = 'rotate(90deg) translateY(0px)';
}

/* -------------- RACE -------------- */

const RACE_BTN = document.querySelector('.race_btn');

const WINNER = {
    minTime: 1000000, 
    winnerID: 0,
};

const race = async function () {
    const cars = document.querySelectorAll('.car');
    const carsID = [];
    for (const car of cars) {
        carsID.push(car.id);
    }
    const promises = carsID.map(async (el) => {
        let time = await moveCar(el);
        if (time < WINNER.minTime) {
            WINNER.minTime = time;
            WINNER.winnerID = el;
        }
    });
    await Promise.any(promises);
    fillModal(Math.floor(WINNER.minTime / 10) / 100, WINNER.winnerID);
    await createWinner({id: WINNER.winnerID, wins: 1, time: Math.floor(WINNER.minTime / 10) / 100});
    mainWin();
};

RACE_BTN.addEventListener('click', () => race());

/* -------------- RESET -------------- */

const RESET_BTN = document.querySelector('.reset_btn');

const reset = async function () {
    const cars = document.querySelectorAll('.car');
    cars.forEach(async (el) => {
        await moveToStart(el.id);
    });
};

RESET_BTN.addEventListener('click', () => reset());

/* -------------- MODAL -------------- */

const modal = document.getElementById('myModal');
const span = document.querySelector(".close");

const fillModal = async function (time, id) {
    const car = await getCar(id);
    document.querySelector(".winner_car").textContent = car.name;
    document.querySelector(".winer_time").textContent = time;
    modal.style.display = "flex";
}

span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/*
getCars([{key: 'name', value: 'Tesla'}, {key: 'name', value: 'BMW'}]); 
getCars([{key: '_page', value: '0'}]); 
getCars(); 
getTotalCountCars();
getCar(24);
createCar({
    name: 'WrumWrum',
    color: '#ffffff',
});
updateCar(24, {
    name: 'Pink Traktor',
    color: 'pink',
});
updateCarParamater(24, {
    color: 'deepBlue',
});
deleteCar(24);

engineStart(24);
engineStop(24);
switchEnginetoDrive(24);

getWinners([{key: '_page', value: 1}, {key: '_limit', value: 10}, {key: '_sort', value: ['id'|'wins'|'time']}]);
getWinner();
createWinner();
updateWinner();
*/


// delete from winners