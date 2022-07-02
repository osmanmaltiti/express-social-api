import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  uid: String,
  following: [],
  followers: [],
});

const PostSchema = new mongoose.Schema({
  postId: String,
  likes: [],
  unlikes: [],
});

export const User = mongoose.model('User', UserSchema);
export const Post = mongoose.model('Post', PostSchema);
