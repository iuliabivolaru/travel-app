function validateForm() {
    console.log('zippp validation ');
    // console.log(document.getElementById('zip').value);
    console.log('start date validation ');
    console.log(document.getElementById('start-date').value);
    return document.getElementById('start-date').value != '' && document.getElementById('start-date').value != '';
}

export { validateForm }