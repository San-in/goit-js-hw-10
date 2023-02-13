import './css/styles.css';
import handleOnSearch from './handleOnSearch';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const linkOnSearchForm = document.getElementById('search-box');

linkOnSearchForm.addEventListener('input',debounce(handleOnSearch,DEBOUNCE_DELAY));




