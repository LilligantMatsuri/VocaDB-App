import 'package:dio/dio.dart';
import 'package:vocadb/models/main_picture_model.dart';
import 'package:vocadb/services/web_service.dart';

class TagModel {
  int id;
  String name;
  String categoryName;
  String additionalNames;
  String description;
  String urlSlug;
  MainPictureModel mainPicture;

  TagModel.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        name = json['name'],
        description = json['description'],
        categoryName = json['categoryName'],
        urlSlug = json['urlSlug'],
        additionalNames = json['additionalNames'],
        mainPicture = json.containsKey('mainPicture')
            ? MainPictureModel.fromJson(json['mainPicture'])
            : null;

  static TagModel _mapObjectResponse(Response response) {
    final result = response.data;
    return TagModel.fromJson(result);
  }

  static Resource<TagModel> byId(int id) {
    return Resource(
        endpoint: '/api/tags/$id?fields=Description',
        parse: _mapObjectResponse);
  }

  get imageUrl => (mainPicture != null && mainPicture.urlThumb != null)
      ? mainPicture.urlThumb
      : null;
}
