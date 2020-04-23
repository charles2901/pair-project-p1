 class HomeController {
  
  static getHome(req, res) {
    let alert = req.query
    res.render('home', {alert})
  }

  static getError(req, res) {
    res.render('error', {error: `404 Not Found!`})
  }
}

module.exports = HomeController