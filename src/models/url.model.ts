import { Document, Schema, model } from 'mongoose';

export interface IUrl extends Document {
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks: { total: number; timestamps: Date[] };
}

const UrlSchema = new Schema<IUrl>({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  clicks: {
    total: { type: Number, default: 0 },
    timestamps: { type: [Date], default: [] },
  },
});

const Url = model('Url', UrlSchema);
export default Url;
