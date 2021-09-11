//3) desde express requiero su método Router.
//4) Router ejecutate y guardate en una constante.
//Creamos esto, para hacer nuestras propias rutas e importarlo en index.js PRINCIPAL
const { Router } = require('express');
const router = new Router();


//routes
router.get('/test', (req, res) => {
    const data = {
        name: 'anzelo',
        website: 'www.anzelo.com'
    };
    res.json(data);
});  

module.exports = router;