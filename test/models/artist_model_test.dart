import 'package:flutter_test/flutter_test.dart';
import 'package:vocadb_app/models.dart';

void main() {
  group('Artist model', () {
    test('should parse from json correctly', () {
      const mockJson = {
        "additionalNames": "Hatsune Miku",
        "artistType": "Vocaloid",
        "id": 1,
        "name": "初音ミク",
        "tags": [
          {
            "count": 1,
            "tag": {"id": 1}
          },
          {
            "count": 2,
            "tag": {"id": 2}
          }
        ],
        "relations": {
          "latestSongs": [
            {"id": 1, "name": "song_a"},
            {"id": 2, "name": "song_b"}
          ],
          "latestAlbums": [
            {"id": 1, "name": "album_a"},
            {"id": 2, "name": "album_b"},
          ],
          "popularSongs": [
            {"id": 1, "name": "album_a"},
            {"id": 2, "name": "album_b"},
          ],
          "popularAlbums": [
            {"id": 1, "name": "album_a"},
            {"id": 2, "name": "album_b"},
          ]
        },
      };

      ArtistModel result = ArtistModel.fromJson(mockJson);
      expect(result.id, 1);
      expect(result.entryType, EntryType.Artist);
      expect(result.name, "初音ミク");
      expect(result.artistType, "Vocaloid");
      expect(result.additionalNames, "Hatsune Miku");
      expect(result.tags, isNotNull);
      expect(result.tags.length, 2);
      expect(result.relations, isNotNull);
      expect(result.relations.latestSongs, isNotNull);
      expect(result.relations.latestSongs.length, 2);
      expect(result.relations.popularSongs, isNotNull);
      expect(result.relations.popularSongs.length, 2);
      expect(result.relations.latestAlbums, isNotNull);
      expect(result.relations.latestAlbums.length, 2);
      expect(result.relations.popularAlbums, isNotNull);
      expect(result.relations.popularAlbums.length, 2);
    });

    test('should not thrown exception when input empty json', () {
      ArtistModel result = ArtistModel.fromJson({});
      expect(result, isNotNull);
    });

    test('should return group of artist by link type', () {
      ArtistLinkList artistLinkList = ArtistLinkList([
        ArtistLinkModel(linkType: 'Group', artist: ArtistModel(name: 'GroupA')),
        ArtistLinkModel(linkType: 'Group', artist: ArtistModel(name: 'GroupB')),
        ArtistLinkModel(
            linkType: 'Illustrator', artist: ArtistModel(name: 'IllustratorA')),
        ArtistLinkModel(
            linkType: 'VoiceProvider',
            artist: ArtistModel(name: 'VoiceProviderA'))
      ]);

      Map<String, List<ArtistLinkModel>> artistLinkGroup =
          artistLinkList.groupByLinkType;

      expect(artistLinkGroup.keys.contains('Group'), isTrue);
      expect(artistLinkGroup['Group'][0].artist.name, 'GroupA');
      expect(artistLinkGroup['Group'][1].artist.name, 'GroupB');
      expect(artistLinkGroup.keys.contains('Illustrator'), isTrue);
      expect(artistLinkGroup['Illustrator'][0].artist.name, 'IllustratorA');
      expect(artistLinkGroup.keys.contains('VoiceProvider'), isTrue);
      expect(artistLinkGroup['VoiceProvider'][0].artist.name, 'VoiceProviderA');
    });
  });
}
