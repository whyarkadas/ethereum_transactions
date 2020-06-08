import { defaultAjaxOptions } from './util/apiHelpers';
import $ from 'jquery'; 

export const createUser = (first_name, last_name, email, password ) =>
//export const createUser = (data ) =>
  $.ajax({
    ...defaultAjaxOptions,
    method: 'POST',
    url: '/users',
    dataType: 'json',
    data: JSON.stringify({
      first_name,
      last_name,
      email,
      password
    }),
    //data: JSON.stringify(data)
  })

export const authenticateUser = (email, password) => 
  $.ajax({
    ...defaultAjaxOptions,
    method: 'POST',
    url: '/login',
    dataType: 'json',
    data: JSON.stringify({
      email,
      password
    }),    
  })

export const autoLogin = (token) => 
  $.ajax({
    ...defaultAjaxOptions,
    method: 'POST',
    url: '/auto_login',    
    headers: {
      Authorization: `Bearer ${token}`
    }    
  })    