const axios = require('axios').default;

class FetchData {
  constructor(amount) {
    this._uri = 'https://randomuser.me/api/';
    this._amountOfUsers = amount;
  }

  async getUsers() {
    for (let i = 0; i < this._amountOfUsers; ++i) {
      const user = await axios.get(this._uri);
      const { first, last } = user.data.results[0].name;
      console.log(`Hi, my name is ${first} ${last}!`);
    }
  }
}

const instance = new FetchData(8);
instance.getUsers();

/* output :
Hi, my name is Fernando Silva!
Hi, my name is Stanley Howard!
Hi, my name is Becky Soto!
Hi, my name is Ellen Mantyla!
Hi, my name is Celina Jennings!
Hi, my name is Hunter Bouchard!
Hi, my name is Ashton Morris!
Hi, my name is Lila Le Gall!
*/
