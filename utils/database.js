import mongoose from 'mongoose';

let isConnected = false; // track the connection

export function getCollectionName() {
  const mongodb_collectionname = process.env.MONGODB_COLLECTION;
  if (!mongodb_collectionname)
    return console.log('MONGODB_COLLECTION not found');
  return mongodb_collectionname;
}

export const connectToDB = async () => {
  console.log('connectToDB()...');
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('Mongoose is already connected');
    return;
  }

  if (!process.env.MONGODB_USERNAME)
    return console.log('MONGODB_USERNAME not found');
  if (!process.env.MONGODB_PASSWORD)
    return console.log('MONGODB_PASSWORD not found');
  if (!process.env.MONGODB_CLUSTER)
    return console.log('MONGODB_CLUSTER not found');
  if (!process.env.MONGODB_URLX) return console.log('MONGODB_URLX not found');

  try {
    const dbusername = encodeURIComponent(process.env.MONGODB_USERNAME);
    const dbpassword = encodeURIComponent(process.env.MONGODB_PASSWORD);

    const connStr = `mongodb+srv://${dbusername}:${dbpassword}@${process.env.MONGODB_CLUSTER}.${process.env.MONGODB_URLX}`;
    //console.log('connStr:', connStr);

    await mongoose.connect(connStr, {
      dbName: 'share_prompt',
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
      //useCreateIndex: true,
    });

    isConnected = true;

    console.log('Mongoose connected');
  } catch (error) {
    console.log('Mongoose.connect failed:', error);
  }
};
