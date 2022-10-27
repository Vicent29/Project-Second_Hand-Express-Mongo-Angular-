var mongoose = require('mongoose');

module.exports = mongoose => {

  var CommentSchema = mongoose.Schema({
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }
  }, { timestamps: true });

  // Requires population of author
  CommentSchema.methods.toJSONFor = function (user) {
    return {
      id: this._id,
      body: this.body,
      createdAt: this.createdAt,
      author: this.author.toProfileJSONFor(user)
    };
  };

  const Comment = mongoose.model("comment", CommentSchema);
  return Comment;
}