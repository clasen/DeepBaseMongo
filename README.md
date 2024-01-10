# 🌳 DeepBase Mongo

DeepBaseMongo is an innovative and efficient module designed to seamlessly integrate with MongoDB, providing a robust solution for managing and interacting with databases. With DeepBaseMongo, you can effortlessly perform CRUD operations and manipulate data stored in MongoDB collections.

For simplicity you may be interested in the version of DeepBase that persists in JSON files. https://www.npmjs.com/package/deepbase

## 📦 Installation
```shell
# DeepBaseMongo requires MongoDB.
docker run --name mongodb -d mongodb/mongodb-community-server:6.0-ubi8

npm install deepbase-mongo
```

## 🔧 Usage
```js
const DeepBase = require("deepbase-mongo");
const mem = new DeepBase({ name: "db" }); // "db" mongo document
await mem.connect();
```

### ✍️ Setting Values
```js
await mem.set("config", "lang", "en");

const configLang = await mem.get("config", "lang");
console.log(configLang); // "en"
```

### ✅ Adding Rows
```js
const path = await mem.add("user", { name: "martin" });

// add() will create a secure key (ie. "iKid4OCK")
console.log(path) // [ 'user', 'iKid4OCK' ]

const userName = await mem.get(...path, "name");
console.log(userName); // "martin"
```

### 🔢 Increment fields
```js
await mem.inc(...path, "balance", 160);
await mem.inc(...path, "balance", 420);

const userBalance = await mem.get(...path, "balance");
console.log(userBalance); // 580
```

### ⚗️ Update
```js
await mem.upd("config", "lang", v => v.toUpperCase());
const lang = await mem.get("config", "lang"); // EN
```

### 🔥 Finally
```js
await mem.add("user", { name: "anya" });

const userIds = await mem.keys("user")
console.log(userIds) // [ 'iKid4OCKds', 'F3wORv_Jsd' ]

console.log(await mem.get())
// {
//     config: { lang: 'EN' },
//     user: {
//         iKid4OCKds: { name: 'martin', balance: 580 },
//         F3wORv_Jsd: { name: 'anya' }
//     }
// }
```

## 🤯 Features
- 🔍 Easily access and modify nested objects in JSON storage.
- 📁 Provides an easy-to-use interface for connecting to MongoDB and performing data operations, saving development.
- 🌱 Simple and intuitive API for managing complex JSON structures.

## 🤔 Why DeepBase 
- ⚡ Fastest and simplest way to add persistence to your projects.
- 📖 Offers advanced querying capabilities, nested value retrieval, and seamless update processes.
- 🧠 Easy to use and understand.

## 🤝 Contributing
Contributions to DeepBase are welcome! If you have an idea or a bug to report, please open an issue. If you would like to contribute to the code, please open a pull request.

## 🎬 Conclusion
DeepBaseMongo is built with efficiency and performance in mind, leveraging the power of the MongoDB driver and optimizing data access operations. Whether you're building a small-scale application or a complex system, DeepBaseMongo empowers you to interact with MongoDB effortlessly, making your development process smoother and more efficient.

🚀 Try DeepBaseMongo today and experience the convenience and power it brings to your MongoDB data management workflow!

## 📄 License
The MIT License (MIT)

Copyright (c) Martin Clasen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.