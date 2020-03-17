


module.exports = (app) => {

const {users} = app.controllers;

app.get('/users', users.todos);

app.get('/add', users.criar1);
app.post('/add', users.criar);



app.get('/edit/(:id)', users.editar_get);
app.put('/edit/(:id)', users.editar_put);

app.delete('/delete/(:id)', users.deletar);


};