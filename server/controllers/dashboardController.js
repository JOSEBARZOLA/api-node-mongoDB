exports.dashboard = async(req, res) =>{
    const locals = {
        title: 'dashboard',
        description: 'Guarda Tus Notas'
    }
res.render('dashboard/index', {
  locals,
  layout: '../views/layouts/dashboard'
});
};