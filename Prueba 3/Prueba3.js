const axios = require('axios');

// 1. Crear usuario y recuperar sus datos
async function createUserAndRetrieveData() {
  try {
    // Crear usuario
    const userResponse = await axios.post('https://petstore.swagger.io/v2/user', {
      id: 1,
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      phone: '1234567890'
    });
    
    console.log('Usuario creado:', userResponse.data);

    // Recuperar datos del usuario
    const userId = userResponse.data.id;
    const userDataResponse = await axios.get(`https://petstore.swagger.io/v2/user/${userId}`);
    
    console.log('Datos del usuario:', userDataResponse.data);
  } catch (error) {
    console.error('Error al crear o recuperar datos del usuario:', error.message);
  }
}

// 2. Recoger datos de las mascotas vendidas y listar sus nombres
async function getSoldPets() {
  try {
    // Obtener mascotas por estado (vendidas)
    const petsResponse = await axios.get('https://petstore.swagger.io/v2/pet/findByStatus', {
      params: {
        status: 'sold'
      }
    });
    
    const soldPets = petsResponse.data;
    const petNames = soldPets.map(pet => ({ id: pet.id, name: pet.name }));
    
    console.log('Mascotas vendidas:', petNames);
  } catch (error) {
    console.error('Error al obtener las mascotas vendidas:', error.message);
  }
}

// 3. Clase para identificar cuántas mascotas tienen el mismo nombre
class PetCounter {
  constructor(petData) {
    this.petData = petData;
  }
  
  countPetsByName() {
    const petCount = {};
    
    this.petData.forEach(pet => {
      const name = pet.name;
      
      if (petCount[name]) {
        petCount[name]++;
      } else {
        petCount[name] = 1;
      }
    });
    
    return petCount;
  }
}

// Ejecutar las funciones y mostrar resultados
createUserAndRetrieveData();
getSoldPets();

// Ejemplo de uso de la clase PetCounter
const petData = [
  { id: 1, name: 'William' },
  { id: 2, name: 'William' },
  { id: 3, name: 'Floyd' },
  { id: 4, name: 'William' }
];

const petCounter = new PetCounter(petData);
const petCounts = petCounter.countPetsByName();

console.log('Conteo de mascotas por nombre:', petCounts);
