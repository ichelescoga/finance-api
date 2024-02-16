const SequelizeAuto = require('sequelize-auto');
const path = require('path');

const auto = new SequelizeAuto('Factoraje', 'dbmasteruser', 'C0NV+y~i*:vo;b_!77P*l!7.mi+Z6(r+', {
  host: 'ls-9ba2964e2f6b032db3cb4aabe05acf7427de1521.cbcimxjrjjuz.us-east-1.rds.amazonaws.com',
  dialect: 'mysql', // o el dialecto de tu base de datos
  directory: path.join(__dirname, 'src/modelsF'), // directorio donde se generarán los modelos
  additional: {
    timestamps: false, // personaliza según tus necesidades
  },
});

auto.run(function (err) {
  if (err) throw err;
  console.log('Modelos generados con éxito');
  process.exit();
});
