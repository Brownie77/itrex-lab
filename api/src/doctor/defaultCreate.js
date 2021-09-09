const database = require('../storage/mysqlDatabase');

async function CreateDoctorsAndSpecialty() {
  console.log('function is workin here');
  await database.specialty.bulkCreate([{ name: 'Physician' }, { name: 'Surgeon' }, { name: 'Cardiologist' }, { name: 'Pediatrician' }]);
  await database.doctor.create({ name: 'Ivan' });
}
export default new CreateDoctorsAndSpecialty();
