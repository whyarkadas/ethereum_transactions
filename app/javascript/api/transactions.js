import { defaultAjaxOptions } from './util/apiHelpers';
import $ from 'jquery'; 

export const fetchAllTransactions = () =>
  $.ajax({
    ...defaultAjaxOptions,
    url: '/transactions',    
  });
