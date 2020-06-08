import { defaultAjaxOptions } from './util/apiHelpers';
import $ from 'jquery'; 

export const fetchComments = (transaction_id) => 
  $.ajax({
    ...defaultAjaxOptions,
    method: 'POST',
    url: '/transaction_comments',
    dataType: 'json',
    data: JSON.stringify({
      transaction_id
    }),
  })

export const sendComment = (text, user_id, transaction_id) => 
  $.ajax({
    ...defaultAjaxOptions,
    method: 'POST',
    url: '/comments',
    dataType: 'json',
    data: JSON.stringify({      
      text,
      user_id,
      transaction_id
    }),
  })

