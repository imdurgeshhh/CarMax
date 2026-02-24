import {faker} from '@faker-js/faker';
import carImage from '../assets/salvo-media-llc-SCZcEVYkB_c-unsplash.jpg';

function createRandomeCarList(){
    return {
        name:faker.vehicle.vehicle(),
        fuelType:faker.vehicle.fuel(),
        model:faker.vehicle.model(),
        type:faker.vehicle.type(),
        
        
        image: carImage,
        miles:1000,
        gearType:'Automatic',
        price:faker.finance.amount({min:4000, max:20000})
    };
}

const carList=faker.helpers.multiple(createRandomeCarList,{
    count:7
})

export default{
    carList
}