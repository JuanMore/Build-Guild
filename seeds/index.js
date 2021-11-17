const mongoose = require('mongoose')
const builders = require('./custombuilds')
const Build = require('../models/build')

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/BuildGuild')

const db = mongoose.connection

// mongoose error handling
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

const seedDb = async () => {
    await Build.deleteMany({})
    builders.forEach(async function (element, random3) {
        random3[element] = Math.floor(Math.random() * 3)
        console.log({
            random3
        })
    })

}

seedDb()

// for (let i = 0; i < 3; i++) {
//     const random3 = Math.floor(Mat.random() * 3)
//     const profile = new Build({
//         person: `${builders[random3].user}, ${builders[random3].description}`
//     })
//     await person.save()
// }