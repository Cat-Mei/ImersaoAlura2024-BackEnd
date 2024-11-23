import 'dotenv/config';
//modelos de conexão com o db
import { ObjectId } from 'mongodb';
import dbConnect from '../config/dbConfig.js';

//conecta ao banco de dados pela string de conexão fornecida.
const connection = await dbConnect(process.env.CONNECTION_STRING);

export /*default*/ async function getTodosOsPosts() { //o default é para uma única função no arquivo inteiro.
    const db = connection.db('imersao-instabytes');
    const collectionPosts = db.collection('posts');
    return collectionPosts.find().toArray();
}

export async function criarNovoPost(novoPost) {
    const db = connection.db('imersao-instabytes');
    const collectionPosts = db.collection('posts');
    return collectionPosts.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = connection.db('imersao-instabytes');
    const collectionPosts = db.collection('posts');
    const objectId = ObjectId.createFromHexString(id);

    return collectionPosts.updateOne({_id: new ObjectId(objectId)}, {$set: novoPost});
}