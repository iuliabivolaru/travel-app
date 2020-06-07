import { handleSubmit } from './js/weather';
import { validateForm } from './js/formValidation';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';

export {
    handleSubmit,
    validateForm
}


// put api calls in index js server side
// create other js files maybe
// refactor - cleanup js and html
// implement additional functionality - add length of the trip
// date validation - sa nu fie mai mica decat current date - de pus la loc <div id="invalid-date"></div>
// si de repus invalid
// write tests - add jest
// do styling 
// write readme
// add service workers