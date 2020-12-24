import 'package:vocadb_app/models.dart';

class WebLinkModel extends BaseModel {
  int id;
  String description;
  String category;
  String url;

  WebLinkModel({this.id, this.description, this.category, this.url});

  WebLinkModel.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        description = json['description'],
        category = json['category'],
        url = json['url'],
        super.fromJson(json);

  static List<WebLinkModel> jsonToList(List items) {
    return items.map((i) => WebLinkModel.fromJson(i)).toList();
  }
}

class WebLinkList {
  final List<WebLinkModel> webLinks;

  WebLinkList(this.webLinks);

  List<WebLinkModel> get officialLinks =>
      webLinks.where((link) => link.category != 'Reference').toList();

  List<WebLinkModel> get unofficialLinks =>
      webLinks.where((link) => link.category == 'Reference').toList();
}
