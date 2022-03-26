/* eslint-disable */
import axios from 'axios';
import { showAlert, hideAlert } from './alerts'

export const login = async (email, password) => {
  try {
  const res = await axios({
    method: 'POST',
    url: '/api/v1/users/login',
    data: { 
      email,
      password,
    }
  });

  if(res.data.status === 'success') {
    showAlert('success', 'Logged in successfuly!');
    window.setTimeout(() => {
      location.assign('/')
    }, 1500);
  }

  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const signUp = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: { 
        email,
        password,
        passwordConfirm,
        name,
      }
    });
    
    if(res.data.status === 'success') {
      showAlert('success', 'We sent you a confimiration email');
    }
  
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
};

export const confirmEmail = async () => {
  try {
    const token = location.href.split('/')[4];
    const url = `/api/v1/users/emailConfirm/${token}`;

    const res = await axios({
      method: 'POST',
      url,
    });
    
    if(res.data.status === 'success') {
      showAlert('success', 'Your email address has been confirmed!');
      window.setTimeout(() => {
        location.assign('/')
      }, 1500);
    }
  
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
};

export const logout = async () => {
  try { 
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });

    if(res.data.status = 'success') location.reload(true);
  } catch(err) {
    showAlert('error', 'Error logging out! Try again.')
  }
}

export const forgotPassword = async (email) => {
  try { 
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: { 
        email,
      }
    });

    if(res.data.status = 'success') {
      showAlert('success', 'Reset email sent!');
    }

  } catch(err) {
    showAlert('error', err.response.data.message);
  }
};

export const resetPassword = async (password, passwordConfirm) => {
  try { 
    const token = location.href.split('/')[4];
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/resetPassword/${token}`,
      data: { 
        password,
        passwordConfirm,
      }
   });
    if(res.data.status = 'success') {
      showAlert('success', 'password has changed 😊');
      window.setTimeout(() => {
        location.assign('/')
      }, 1000);
    }
  } catch(err) {
    showAlert('error', err.response.data.message);
  }
};