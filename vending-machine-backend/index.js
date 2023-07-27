const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDBの接続URIを設定してください
const mongoURI = 'mongodb+srv://vendingmachine:gVrT2F9RoakabnDh@cluster0.l7roime.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// 自動販売機の位置情報のスキーマを定義します
const vendingMachineSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
});

const VendingMachine = mongoose.model('VendingMachine', vendingMachineSchema);

// 自動販売機の位置情報を保存するエンドポイントを作成します
app.post('/api/vending-machines', async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;
    const newVendingMachine = new VendingMachine({ name, latitude, longitude });
    await newVendingMachine.save();
    res.status(201).json(newVendingMachine);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save vending machine location' });
  }
});

// 自動販売機の位置情報を取得するエンドポイントを作成します
app.get('/api/vending-machines', async (req, res) => {
  try {
    const vendingMachines = await VendingMachine.find();
    res.json(vendingMachines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vending machine locations' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
