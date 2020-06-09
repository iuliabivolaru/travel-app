import { handleSubmit } from './js/weather';
import { validateForm } from './js/formValidation';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';

export {
    handleSubmit,
    validateForm
}


// create other js files maybe
// refactor - cleanup html and css - rename
// implement additional functionality - add length of the trip
// date validation - sa nu fie mai mica decat current date - de pus la loc <div id="invalid-date"></div>
// si de repus invalid - poate!
// do styling - style results area;
// comment code daca e cazul
// de specificat in readme additional feature
// responsiveness
// add service workers