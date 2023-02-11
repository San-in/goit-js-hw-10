import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    width: '300px',
    position: 'center-center', 
    warning: {
      background: 'rgba(255,0,0,0.765)',
      notiflixIconColor: 'rgba(255,255,255,0.8)',
    },
    success: {
      notiflixIconColor: 'rgba(255,255,255,0.8)'
    }
  });
  export default Notify;
