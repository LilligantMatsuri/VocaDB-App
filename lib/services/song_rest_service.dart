import 'dart:async';

import 'package:vocadb/models/song_model.dart';
import 'package:vocadb/services/base_rest_service.dart';
import 'package:vocadb/services/web_service.dart';

class SongRestService extends BaseRestService {
  SongRestService(RestService restService) : super(restService);

  Future<List<SongModel>> highlighted() async {
    final String endpoint = '/api/songs/highlighted';
    final Map<String, String> params = {'fields': 'ThumbUrl,PVs'};
    return super
        .query(endpoint, params)
        .then((items) => SongModel.jsonToList(items));
  }
}
