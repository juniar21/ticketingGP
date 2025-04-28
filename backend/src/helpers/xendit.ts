import { Xendit } from 'xendit-node';

const xendit = new Xendit({
  secretKey: process.env.SECRET_API_KEY!,
})

export default xendit;