import db from "./db";

export default {

  isAuth: (userToken) =>{
      return userToken !== undefined
  },

  logout: () =>{
    db.delete()
    .then(() =>{
      localStorage.clear();
    })
    .catch((err) => console.log('err in delete db ======> ', err))
  },

  check: (timeSession, userTimeSession) => {
    var hours = timeSession; // Reset when storage is more than 2hours
    var now = new Date().getTime();
    var setupTime = userTimeSession ? userTimeSession:0

    if(now-setupTime > hours *60*60*1000) {
      return true;
    } else {
      return false
    }
  }
};