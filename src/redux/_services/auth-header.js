//Check localstorage for user item

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.name) {
      return { Authorization: 'Bearer ' + access };
    } else {
      return {};
    }
  }