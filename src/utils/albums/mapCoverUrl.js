const mapCoverUrl = ({
  id, name, year, cover,
}) => ({
  id,
  name,
  year,
  coverUrl: cover,
});

module.exports = mapCoverUrl;
