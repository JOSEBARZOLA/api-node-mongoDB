/**
 * GET
 * Homepage
 */

exports.homepage = async(req, res) =>{
          const locals = {
              title: 'App Notas',
              description: 'Guarda Tus Notas'
          }
      res.render('index', {
        locals,
        layout: '../views/layouts/front-page'
    });
};

/**
 * GET
 * about
 */

exports.about = async(req, res) =>{
     const locals = {
         title: 'About - App Notas',
         description: 'Guarda Tus Notas'
     }
 res.render('about', locals);
};
