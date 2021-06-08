const express =require('express');
const app= express();
const clientsRoutes=require('./routes/clients.routes');
const projectsRoutes=require('./routes/projects.routes');
const employeesRoutes=require('./routes/employees.routes');

require('dotenv').config();

app.set('port',process.env.PORT);

app.listen(app.get('port'), ()=>{
    console.log('port on server', app.get('port'));
})

app.use('/clientes', clientsRoutes);
app.use('/proyectos', projectsRoutes);
app.use('/empleados', employeesRoutes);