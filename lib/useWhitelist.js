const useWhitelist = async (req, res) => {// Disallow access by default
  let shouldDisallowAccess = true

  // Specify IP's that you want to whitelist. This could be an office/VPN IP address.
  const allowedIps = ['37.6.11.79', '::ffff:127.0.0.2']

  // Read the request objects headers to find our who's trying to access this page
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

  // This if statement is only valid if the app is deployed through Now. It gets ignored on other environments.
  if (true) {
    // Check if the visitors IP address is allowed
    if (allowedIps.includes(ip)) {
        console.log("DOES NOT INCLUDE");
      shouldDisallowAccess = false
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