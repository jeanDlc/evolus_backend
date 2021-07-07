const express =require('express');
const app= express();
const clientRoutes=require('./routes/client.routes');
const projectRoutes=require('./routes/project.routes');
const employeeRoutes=require('./routes/employee.routes');
const taskRoutes=require('./routes/task.routes');
const rolRoutes=require('./routes/rol.routes');
const authRoutes=require('./routes/auth.routes');
const {initializeRolTables}=require('./config/initializeSomeTables');
const db=require('./config/db');
const cors=require('cors');
require('dotenv').config();

require('./models/Cliente');
require('./models/Rol');
require('./models/Empleado');
require('./models/Proyecto');
require('./models/Tarea');
require('./models/Proyecto_Empleado');
db.sync()
    .then(()=>{
        initializeRolTables()
        console.log('database connected');
    })
    .catch(error=>console.log(error.message || error))

app.set('port',process.env.PORT);

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.listen(app.get('port'), ()=>{
    console.log('port on server', app.get('port'));
})

app.use('/clientes', clientRoutes);
app.use('/proyectos', projectRoutes);
app.use('/empleados', employeeRoutes);
app.use('/tareas', taskRoutes);
app.use('/roles', rolRoutes);
app.use('/auth', authRoutes);