 module.exports= parseCookies = (cookieHeader) => {
    try{
    if (!cookieHeader) {
      return {};
    }
  
    return cookieHeader.split(';').reduce((cookies, cookie) => {
      const [name, value] = cookie.split('=').map((c) => c.trim());
      cookies[name] = decodeURIComponent(value);
      return cookies;
    }, {});
}catch(e){return false}
  };
  


  