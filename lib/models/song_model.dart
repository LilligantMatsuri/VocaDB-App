import 'dart:convert';

import 'package:vocadb/models/album_model.dart';
import 'package:vocadb/models/artist_song_model.dart';
import 'package:vocadb/models/entry_model.dart';
import 'package:vocadb/models/pv_model.dart';
import 'package:vocadb/models/tag_group_model.dart';
import 'package:vocadb/models/tag_model.dart';
import 'package:vocadb/services/web_service.dart';

class SongModel {
  int id;
  String name;
  String artistString;
  String thumbUrl;
  List<PVModel> pvs;
  List<TagGroupModel> tagGroups;
  List<ArtistSongModel> artists;
  List<AlbumModel> albums;

  SongModel();

  SongModel.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        name = json['name'],
        artistString = json['artistString'],
        thumbUrl = json['thumbUrl'],
        pvs = (json.containsKey('pvs'))
            ? (json['pvs'] as List)?.map((d) => PVModel.fromJson(d))?.toList()
            : null,
        tagGroups = (json.containsKey('tags'))
            ? (json['tags'] as List)
                ?.map((d) => TagGroupModel.fromJson(d))
                ?.toList()
            : null,
        artists = (json.containsKey('artists'))
            ? (json['artists'] as List)
                ?.map((d) => ArtistSongModel.fromJson(d))
                ?.toList()
            : null,
        albums = (json.containsKey('albums'))
            ? (json['albums'] as List)
                ?.map((d) => AlbumModel.fromJson(d))
                ?.toList()
            : null;

  SongModel.fromEntry(EntryModel entry)
      : id = entry.id,
        name = entry.name,
        artistString = entry.artistString,
        thumbUrl = entry.mainPicture?.urlThumb;

  PVModel get youtubePV =>
      pvs?.firstWhere((pv) => pv.service.toLowerCase() == "youtube",
          orElse: () => null);

  List<TagModel> get tags =>
      (this.tagGroups != null) ? this.tagGroups.map((t) => t.tag).toList() : [];

  List<ArtistSongModel> get producers =>
      this.artists.where((a) => a.isProducer).toList();

  List<ArtistSongModel> get vocalists =>
      this.artists.where((a) => a.isVocalist).toList();

  List<ArtistSongModel> get otherArtists =>
      this.artists.where((a) => !a.isVocalist && !a.isProducer).toList();

  static SongModel _mapObjectResponse(response) {
    final result = json.decode(response.body);
    return SongModel.fromJson(result);
  }

  static List<SongModel> _mapArrayResponse(response) {
    Iterable result = json.decode(response.body);
    return result.map((model) => SongModel.fromJson(model)).toList();
  }

  static List<SongModel> _mapItemsResponse(response) {
    Iterable result = json.decode(response.body)['items'];
    return result.map((model) => SongModel.fromJson(model)).toList();
  }

  static Resource<SongModel> byId(int id) {
    return Resource(
        endpoint:
            '/api/songs/$id?fields=PVs,ThumbUrl,Albums,Artists,Tags,WebLinks',
        parse: _mapObjectResponse);
  }

  static Resource<List<SongModel>> get all {
    return Resource(
        endpoint: '/api/songs/highlighted?fields=ThumbUrl',
        parse: _mapArrayResponse);
  }

  static Resource<List<SongModel>> topRated(int durationHours) {
    return Resource(
        endpoint:
            '/api/songs/top-rated?durationHours=$durationHours&filterBy=CreateDate&fields=MainPicture,PVs,ThumbUrl',
        parse: _mapArrayResponse);
  }

  static Resource<List<SongModel>> latestByTagId(int tagId) {
    return Resource(
        endpoint: '/api/songs?tagId=$tagId&fields=ThumbUrl&sort=AdditionDate',
        parse: _mapItemsResponse);
  }

  static Resource<List<SongModel>> topByTagId(int tagId) {
    return Resource(
        endpoint: '/api/songs?tagId=$tagId&fields=ThumbUrl&sort=RatingScore',
        parse: _mapItemsResponse);
  }
}

class RankDuration {
  static const int DAILY = 24;
  static const int WEEKLY = 168;
  static const int MONTHLY = 720;
  static const int OVERALL = 0;
}