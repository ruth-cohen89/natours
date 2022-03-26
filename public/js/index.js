/* eslint-disable */
import '@babel/polyfill';

import { login, signUp, logout, forgotPassword, resetPassword, confirmEmail } from './login';
import { displayMap } from './mapbox';
import { createReview } from './createReview';
import { updateSettings } from './updateSettings'
import { bookTour } from './stripe';

const mapBox = document.getElementById('map');

const loginForm = document.querySelector('.form--login');
const signUpForm = document.querySelector('.form--signup');
const reviewForm = document.querySelector('.form--review');

const forgotPasswordForm = document.querySelector('.form--forgot');
const resetPasswordForm = document.querySelector('.form--reset');

const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

const confirmBtn = document.querySelector('.nav__el--con');
const logOutBtn = document.querySelector('.nav__el--logout');
const bookBtn = document.getElementById('book-tour');

if (mapBox) {
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(locations);
  }

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if(signUpForm) {
  signUpForm.addEventListener('submit', e => {
      e.preventDefault();
      let name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('passwordConfirm').value; 
      signUp(name, email, password, passwordConfirm);
    });
} 

if(reviewForm) {
  reviewForm.addEventListener('submit', e => {
      e.preventDefault();
      const { tourId } = e.target.dataset;
      const review = document.getElementById('review').value; 
      const rating = document.getElementById('rating').value; 
      createReview(review, rating, tourId);
  });
} 

if(confirmBtn) {
  confirmBtn.addEventListener('click', confirmEmail);
};

if(logOutBtn) {
  logOutBtn.addEventListener('click', logout);
};

if(forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;  
    forgotPassword(email);   
  });
}

if(resetPasswordForm) {
 resetPasswordForm.addEventListener('submit', e => {
  e.preventDefault();
  const password = document.getElementById('password').value; 
  const passwordConfirm = document.getElementById('passwordConfirm').value; 
  resetPassword(password, passwordConfirm);   
});
}

if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
  
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');
    
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  }); 
}

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}