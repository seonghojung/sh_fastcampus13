function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookieHour(name, value, hours) {
  const now = new Date();
  let time = now.getTime();
  time += 3600 * 1000 * hours;
  now.setTime(time);
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${now.toUTCString()};`;
}
