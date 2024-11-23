import { MongoClient } from "mongodb";
//comando exportando a função de acesso ao banco de dados. Pode ser importado em outro arquivo.
export default async function dbConnect(connectionString) {
    let mongoClient;
    try {
        mongoClient = new MongoClient(connectionString);
        console.log('Connecting to cluster...');
        await mongoClient.connect();
        console.log('MongoDB Atlas connection ready.');
        return mongoClient;
    } catch (error) {
        console.error('Connection failed. Unable to reach database.', error);
        process.exit();
    }
}