const path = require('path');

const Albums = require('./api/albums');
const AlbumService = require('./services/albumService');
const AlbumValidator = require('./validations/albums');

const Songs = require('./api/songs');
const SongValidator = require('./validations/songs');
const SongService = require('./services/songService');

const Users = require('./api/users');
const UserValidator = require('./validations/users');
const UserService = require('./services/userService');

const Authentication = require('./api/authentications');
const AuthenticationValidator = require('./validations/authentications');
const AuthenicationService = require('./services/authenticationsService');
const tokenManager = require('./tokenize/TokenManager');

const Playlist = require('./api/playlists');
const PlaylistValidator = require('./validations/playlists');
const PlaylistService = require('./services/playlistsService');

const PlaylistSongs = require('./api/playlistSongs');
const PlaylistSongValidator = require('./validations/playlistSong');
const PlaylistSongService = require('./services/playlistsSongService');

const Collaborations = require('./api/collaborations');
const CollaborationsValidator = require('./validations/collaborations');
const CollaborationService = require('./services/collaborationService');

const Activities = require('./api/activities');
const ActivityService = require('./services/Activities');

const Exports = require('./api/exports');
const ExportsValidator = require('./validations/exports');
const exportService = require('./services/exportsService');

const UploadValidator = require('./validations/uploads');
const StorageService = require('./services/StorageService');

const AlbumLike = require('./api/albumLikes');
const AlbumLikeService = require('./services/AlbumLikesService');

const CacheService = require('./services/CacheService');

const albumService = new AlbumService();
const songService = new SongService();
const userService = new UserService();
const authenticationsService = new AuthenicationService();
const playlistsSongService = new PlaylistSongService();
const collaborationService = new CollaborationService();
const playlistService = new PlaylistService(collaborationService);
const activitiesService = new ActivityService();
const storageService = new StorageService(path.resolve(__dirname, 'api', 'albums', 'file', 'images'));
const albumLikeService = new AlbumLikeService();
const cacheService = new CacheService();

const routess = [
  {
    plugin: Albums,
    options: {
      service: albumService,
      validator: AlbumValidator,
      UploadValidator,
      storageService,
    },
  },
  {
    plugin: Songs,
    options: {
      service: songService,
      validator: SongValidator,
    },
  },
  {
    plugin: Users,
    options: {
      service: userService,
      validator: UserValidator,
    },
  },
  {
    plugin: Authentication,
    options: {
      service: authenticationsService,
      validator: AuthenticationValidator,
      userService,
      tokenManager,
    },
  },
  {
    plugin: Playlist,
    options: {
      service: playlistService,
      validator: PlaylistValidator,
    },
  },
  {
    plugin: PlaylistSongs,
    options: {
      service: playlistsSongService,
      validator: PlaylistSongValidator,
      playlistService,
      songService,
      activitiesService,
    },
  },
  {
    plugin: Collaborations,
    options: {
      service: collaborationService,
      validator: CollaborationsValidator,
      playlistService,
      userService,
    },
  },
  {
    plugin: Activities,
    options: {
      service: activitiesService,
      playlistService,
    },
  },
  {
    plugin: Exports,
    options: {
      service: exportService,
      validator: ExportsValidator,
      playlistService,
    },
  },
  {
    plugin: AlbumLike,
    options: {
      service: albumLikeService,
      albumService,
      cacheService,
    },
  },
];
module.exports = routess;
