const useWhitelist = async (req, res) => {// Disallow access by default
  const openForEveryone = true
  const closedForEveryone = false

  if (closedForEveryone) {
    console.log("Closed for everyone")
    res.statusCode = 403
    res.end(`You are connecting from |${ip}|`)
    return {}
  }

  if (openForEveryone) {
    console.log("Open for everyone")
    return {}
  }


  let shouldDisallowAccess = true

  // Specify IP's that you want to whitelist. This could be an office/VPN IP address.
  const baseAllowedIps = ['::ffff:127.0.0.1', '127.0.0.1']
  let extraIps = process.env.ALLOWED_IPS
  console.log("The extra ips: " + extraIps)
  if (extraIps) {
    extraIps = extraIps.split(',')
  }
  else {
    extraIps = []
  }
  let allowedIps = [...baseAllowedIps, ...extraIps]

  // Read the request objects headers to find our who's trying to access this page
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  console.log("Received ip: " + ip)

  let str_array = ip.split(',');

  for(let i = 0; i < str_array.length; i++) {
     // Trim the excess whitespace.
    str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
    console.log("Normalized ip: " + str_array[i])
}



  // This if statement is only valid if the app is deployed through Now. It gets ignored on other environments.
  if (true) {
    // Check if the visitors IP address is allowed
    console.log("Will check against " + allowedIps)
    for(let i = 0; i < str_array.length; i++) {
      if (allowedIps.includes(str_array[i])) {
        console.log(str_array[i] + " is included");
      shouldDisallowAccess = false
      }
      else {
        console.log(str_array[i] + " is not included");
      }
    }

  }

  // Return the 403 status code
  if (shouldDisallowAccess) {
    res.statusCode = 403
    res.end(`Not allowed for |${ip}|`)
    return
  }
  // This object gets injected into the Pages props, if you want to use them
  return { shouldDisallowAccess, ip }
}

export default useWhitelist