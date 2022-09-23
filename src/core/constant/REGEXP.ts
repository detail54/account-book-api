const REGEXP = {
  USER_ID_REGEXP: /^[a-z]+[a-z0-9]{5,19}$/g,
  USER_PASSWORD_REGEXP:
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
}

export default REGEXP
