const express = require('express');
const mongoose = require('mongoose');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const bodyParser = require('body-parser');

// MongoDB bilan ulanish
const run = async () => {
  await mongoose.connect('mongodb://localhost:27017/adminbro-demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Ma'lumotlar bazasi modeli
  const User = mongoose.model('User', { name: String, email: String });

  // AdminBro konfiguratsiyasi
  AdminBro.registerAdapter(AdminBroMongoose);
  const adminBro = new AdminBro({
    resources: [{ resource: User, options: { parent: { name: 'User Management' } } }],
    rootPath: '/admin',
  });

  const router = AdminBroExpress.buildRouter(adminBro);

  // Express ilovasini sozlash
  const app = express();
  app.use(adminBro.options.rootPath, router);

  // Body-parser middleware
  app.use(bodyParser.json());

  // POST so'rovi uchun API
  app.post('/api/data', (req, res) => {
    const data = req.body;
    console.log(data);

    // Ma'lumotlarni qayta ishlash (masalan, bazaga yozish yoki boshqa amallar)

    res.status(200).json({ message: "Ma'lumotlar qabul qilindi", receivedData: data });
  });

  // Serverni ishga tushirish
  app.listen(3000, () => console.log('AdminBro is running on http://localhost:3000/admin'));
}

run().catch(error => console.error('Failed to start server:', error));
