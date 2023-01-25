
export const get_config = () => {
  let config = {
    headers: {
      "Authorization": 'Bearer ' + localStorage.getItem("access"),
    },
  };
  return config;
};

export const isLoggedIn = () => {
  const token = localStorage.getItem('access')
  if (token) return true
  else return false
}

export const convertDateFromTimeStamp = (date) =>{
  const today = new Date(date)
  var day = today.toLocaleString('default', { day: 'numeric' });
  var month = today.toLocaleString('default', { month: 'short' });
  var year = today.toLocaleString('default', { year: 'numeric' });
  var weekday = today.toLocaleString('default', { weekday: 'short' });
  return `${weekday} ${month} ${day} ${year}`
}