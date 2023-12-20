const SequelizeAuto = require('sequelize-auto');
const path = require('path');

const auto = new SequelizeAuto('FinanceApp', 'dbmasteruser', '123', {
  host: 'localhost',
  dialect: 'mysql', // o el dialecto de tu base de datos
  directory: path.join(__dirname, 'src/models'), // directorio donde se generarán los modelos
  additional: {
    timestamps: false, // personaliza según tus necesidades
  },
});

auto.run(function (err) {
  if (err) throw err;
  console.log('Modelos generados con éxito');
  process.exit();
});
