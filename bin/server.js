const PORT = process.env.PORT || 3000
const app = require('../app')

app.listen(PORT, () => {
  console.log(`app running on 'http://localhost:${PORT}'`)
})