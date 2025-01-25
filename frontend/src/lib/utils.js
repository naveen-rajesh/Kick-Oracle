// src/lib/utils.js

// Function to format numbers as currency
export const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };
  
  // Function to validate email format
  export const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };
  
  // Function to format date as 'Month Day, Year'
  export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  // Function to check if a number is valid
  export const isValidNumber = (value) => {
    return !isNaN(value) && value > 0;
  };
  
  // Function to get a random color
  export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  // Function to calculate percentage of a value
  export const calculatePercentage = (value, total) => {
    if (total === 0) return 0;
    return (value / total) * 100;
  };
  
  // Function to filter objects based on a condition (used in search forms)
  export const filterArray = (array, condition) => {
    return array.filter(item => {
      return Object.keys(condition).every(key => item[key] === condition[key]);
    });
  };
  
  // Function to debounce an input (useful for limiting API calls during input changes)
  export const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
  
  // Function to check if a string is empty
  export const isEmpty = (str) => {
    return !str || str.trim().length === 0;
  };
  
  // Utility to get today's date in 'YYYY-MM-DD' format
  export const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = (today.getMonth() + 1).toString().padStart(2, '0');
    const dd = today.getDate().toString().padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  
  export const cn = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };