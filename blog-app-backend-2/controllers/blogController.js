const { Blog, User } = require('../models');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const blog = await Blog.create({
      title,
      content,
      userId
    });

    res.status(201).send(blog);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
    //   include: [{
    //     model: User,
    //     // attributes: ['username', 'email']
    //   }]
    });

    res.send(blogs);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({
        where: { id }
        // include: [User] 
        // include: [{ model: User, as: 'User' }]  // Explicitly state the model and use the default name
      });

    if (!blog) {
      return res.status(404).send({ error: 'Blog post not found' });
    }

    res.send(blog);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).send({ error: 'Blog post not found' });
    }

    blog.title = title;
    blog.content = content;
    await blog.save();

    res.send(blog);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).send({ error: 'Blog post not found' });
    }

    await blog.destroy();
    res.send({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};
