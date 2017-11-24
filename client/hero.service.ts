import axios from 'axios';

const api = 'api';

class HeroService {
  constructor() {
    console.log('creating new instance of hero.service');
  }
  
  deleteHero(hero) {
    return axios.delete(`${api}/hero/${hero.id}`);
  }
  getHeroes() {
    return axios.get(`${api}/heroes`);
  }
  addHero(hero) {
    return axios.post(`${api}/hero/`, { hero });
  }
  updateHero(hero) {
    return axios.put(`${api}/hero/${hero.id}`, { hero });
  }
}

// Export a singleton instance in the global namespace
export const heroService = new HeroService();
