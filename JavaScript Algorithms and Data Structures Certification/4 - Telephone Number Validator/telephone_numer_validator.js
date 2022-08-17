function telephoneCheck(phoneNumber) {
  /*There are plenty of regex on internet, i don't want to re-invent the wheel.
  Google the thing to validate ie: phone, email, etc and personalize (and test it!) 
  with a tool like https://regex101.com/
  */
  const regex = /^([+]?1[\s]?)?((?:[(](?:[2-9]1[02-9]|[2-9][02-8][0-9])[)][\s]?)|(?:(?:[2-9]1[02-9]|[2-9][02-8][0-9])[\s.-]?)){1}([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2}[\s.-]?){1}([0-9]{4}){1}$/;

  return regex.test(phoneNumber)
}
