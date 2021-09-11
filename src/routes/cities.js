const { Router } = require('express');
const router = new Router();
const _ = require('underscore');

const cities = require('../weather.json');

router.get('/', (req, res) => {
    res.json(cities);
});

router.get('/:name', (req, res) => {
    const { name } = req.body;
    let response = [];
    _.each(cities, (citie, i) => {
        if(citie.name == name){
            response.push(citie);
         }
    })
    res.json(response);
});

router.get('/:cod', (req, res) => {
    const { cod } = req.params;
    let found = false;
    _.each(cities, (citie, i) => {
        if(citie.cod == cod && !found){
            res.json(citie);
            found = true;
        }
    })
});


router.post('/', (req, res) => {
    const id = cities.length + 1;
    const { name, humidity, temperature, wind, code } = req.body;
    const newcitie = { ...req.body, id };
    if (id && name && humidity && temperature && wind && code) {
        cities.push(newcitie);
        res.json(cities);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

//27-28)guardo los datos que quiero actualizar
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, humidity, temperature, wind, code} = req.body;
    if (id && name && humidity && temperature && wind && code) {
        _.each(cities, (citie, i) => {
            if (citie.id === id) {
                citie.name = name;
                citie.humidity = humidity;
                citie.temperature = temperature;
                citie.wind = wind;
                citie.code = code;
            }
        });
        res.json(cities);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

//recorro mi arreglo de cities, obtengo una citie en cada ciclo
//si su id es igual al id que recibo, entonces la borro.
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(cities, (citie, i) => {
            if (citie.id == id) {
                cities.splice(i, 1);
            }
        });
        res.json(cities);
    }
});

module.exports = router;
