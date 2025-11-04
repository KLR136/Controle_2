const User = require('./user');
const Video = require('./video');
const Comment = require('./comment');
const Playlist = require('./playlist');
const PlaylistVideo = require('./playlistvideo');

User.hasMany(Comment, {
  foreignKey: 'userId',
  as: 'comments'
});
Comment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

Video.hasMany(Comment, {
  foreignKey: 'videoId',
  as: 'comments'
});
Comment.belongsTo(Video, {
  foreignKey: 'videoId',
  as: 'video'
});

User.hasMany(Playlist, {
  foreignKey: 'userId',
  as: 'playlists'
});
Playlist.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

Playlist.belongsToMany(Video, {
  through: PlaylistVideo,
  foreignKey: 'playlistId',
  otherKey: 'videoId',
  as: 'videos'
});

Video.belongsToMany(Playlist, {
  through: PlaylistVideo,
  foreignKey: 'videoId',
  otherKey: 'playlistId',
  as: 'playlists'
});

Playlist.hasMany(PlaylistVideo, {
  foreignKey: 'playlistId',
  as: 'playlistVideos'
});

Video.hasMany(PlaylistVideo, {
  foreignKey: 'videoId',
  as: 'videoPlaylists'
});

PlaylistVideo.belongsTo(Playlist, {
  foreignKey: 'playlistId',
  as: 'playlist'
});

PlaylistVideo.belongsTo(Video, {
  foreignKey: 'videoId',
  as: 'video'
});

module.exports = {
  User,
  Video,
  Comment,
  Playlist,
  PlaylistVideo
};