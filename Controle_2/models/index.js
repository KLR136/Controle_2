const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Connexion à la base
const sequelize = new Sequelize('video_platform', 'root', 'mot_de_passe', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

// Import des modèles
const User = require('./user')(sequelize, DataTypes);
const Video = require('./video')(sequelize, DataTypes);
const Comment = require('./comment')(sequelize, DataTypes);
const Playlist = require('./playlist')(sequelize, DataTypes);
const PlaylistVideo = require('./playlistvideo')(sequelize, DataTypes);

// Définition des relations (exemples)
User.hasMany(Comment);
Comment.belongsTo(User);

Video.hasMany(Comment);
Comment.belongsTo(Video);

User.hasMany(Playlist);
Playlist.belongsTo(User);

Playlist.belongsToMany(Video, { through: PlaylistVideo });
Video.belongsToMany(Playlist, { through: PlaylistVideo });

// Export
module.exports = {
  sequelize,
  User,
  Video,
  Comment,
  Playlist,
  PlaylistVideo
};
