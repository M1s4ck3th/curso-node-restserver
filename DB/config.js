const mongoose = require('mongoose');



const dbConnection = async() => {

    try {
        
        await mongoose.connect( `mongodb+srv://Lostland:XjrDUxz4e6lr2ze7@myclustercoffee.wrjey0v.mongodb.net/cafeDB`, {

        // En la nueva actualizacion no se usan
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        } );

        console.log('Base de datos online')

    } catch (error) {
        console.log(error)
        throw new Error('Error en la base de datos');
    }

}



module.exports = {
    dbConnection
}