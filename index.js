const express =require('express');
const app= express();
const clientRoutes=require('./routes/client.routes');
const projectRoutes=require('./routes/project.routes');
const employeeRoutes=require('./routes/employee.routes');
const db=require('./config/db');
require('dotenv').config();

require('./models/Cliente');
require('./models/Rol');
require('./models/Empleado');
require('./models/Proyecto');
require('./models/Tarea');
require('./models/Proyecto_Empleado');
db.sync()
    .then(()=>console.log('database connected'))
    .catch(error=>console.log(error.message || error))

app.set('port',process.env.PORT);

app.listen(app.get('port'), ()=>{
    console.log('port on server', app.get('port'));
})

app.use('/clientes', clientRoutes);
app.use('/proyectos', projectRoutes);
app.use('/empleados', employeeRoutes);