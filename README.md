# ION Organizer API

### It`s the backend part for ion organizer.

## Installation

To install and run the app you need :

1. Check if you already have installed package manager, otherwise install it.

2. Clone this repository to your machine.

3. Run `npm install`(maybe you will need to use `sudo`);

4. Before running you need to set connection to the database which contains data for the shops accorgingly to the models and create _db.js_ file.

**Database**

Remote database on mongo`s app:

```
import mongoose from 'mongoose';

export const connectDB = () => {
    mongoose
    .connect('_Your connection URI here_')
    .then(() => console.log('DB conected'))
    .catch((err) => console.log('DB error', err));
};
```

Local database:

```
import mongoose from 'mongoose';

const dbName = 'ionDB'; // DB Name

const MONGODB_URI = `mongodb://localhost:27017/${dbName}`; // URI

export const connectDB = async () => {
    try {
    await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log('DB conected'))
    .catch((err) => console.log('DB error', err));
    };
};
```

Don`t forget to start your mongod.service.

---

5. To start the server write `node server.js`.

Success.

## Docker

For building container use `docker build -t ion-organizer-api .`.

For running docker container use `docker container run -d -p 8080:8080 --name ION-api ion-organizer-api`.
