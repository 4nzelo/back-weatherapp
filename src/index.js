const express = require('express');
const morgan = require('morgan');
const app = express();

//settings, .PORT que tome puerto definido por la nube o el 3000 por defecto.
app.set('port', process.env.PORT || 4000);

//middleware, recepcón data de forms, recepción de JSON
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//routes
app.use(require('./routes'));
app.use('/api/cities', require('./routes/cities'));


//Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});