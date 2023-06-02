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

exports.about = async(req, res) =>{
  const locals = {
      title: 'About - App Notas',
      description: 'Guarda Tus Notas'
  }
res.render('about', locals);
};