import mongoose from 'mongoose';

const DEFAULT_MONGODB_URI = 'mongodb+srv://praveenkrisk1204_db_user:abTI94Wn0uTJ55kY@cluster0.7xcs791.mongodb.net/portfolio?retryWrites=true&w=majority';
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

// Define MongoDB Contact Schema
const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    received: { type: Date, default: Date.now }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

let Contact = null;
let isConnected = false;

export async function init() {
    if (isConnected) return;
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        isConnected = true;
        Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
        console.log(`💾 Connected to MongoDB Database: ${conn.connection.name}`);
    } catch (error) {
        console.error('❌ Failed to connect to MongoDB:', error.message);
        throw error;
    }
}

async function ensureConnected() {
    if (!isConnected) {
        await init();
    }
}

export async function getContacts() {
    await ensureConnected();
    try {
        const items = await Contact.find().sort({ received: -1 }).exec();
        return items.map(c => {
            // Format timestamp like SQLite (YYYY-MM-DD HH:MM:SS) in local timezone
            const date = new Date(c.received);
            const pad = (n) => String(n).padStart(2, '0');
            const receivedStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

            return {
                id: c._id.toString(), // String representation of ObjectId works perfectly for deletion
                name: c.name,
                email: c.email,
                subject: c.subject,
                message: c.message,
                received: receivedStr
            };
        });
    } catch (e) {
        console.error('❌ Error fetching contacts:', e);
        return [];
    }
}

export async function getTotalCount() {
    await ensureConnected();
    try {
        return await Contact.countDocuments().exec();
    } catch (e) {
        return 0;
    }
}

export async function addContact(name, email, subject, message) {
    await ensureConnected();
    const c = new Contact({ name, email, subject, message });
    const saved = await c.save();
    return saved._id.toString();
}

export async function deleteContact(id) {
    await ensureConnected();
    await Contact.findByIdAndDelete(id).exec();
}

export function getDbMode() {
    return 'mongodb';
}
