import 'package:flutter/material.dart';
import 'package:vocadb_app/models.dart';
import 'package:vocadb_app/widgets.dart';

/// A widget display list of artists and grouping by link type
class ArtistLinkListView extends StatelessWidget {
  final List<ArtistLinkModel> artistLinks;

  final Function(ArtistLinkModel) onSelect;

  const ArtistLinkListView({@required this.artistLinks, this.onSelect});

  List<Widget> _generateItems() {
    List<Widget> items = [];

    ArtistLinkList(this.artistLinks)
        .groupByLinkType
        .forEach((linkType, artistLinkList) {
      items.add(_buildHeader(linkType));
      items.addAll(artistLinkList.map<Widget>(_mapArtistLinkTile).toList());
    });

    return items;
  }

  Widget _buildHeader(String title) {
    return ListTile(
      title: Text(title),
    );
  }

  ArtistTile _mapArtistLinkTile(ArtistLinkModel model) {
    return ArtistTile(
      name: model.artist.name,
      imageUrl: model.artist.imageUrl,
      onTap: () => this.onSelect(model),
    );
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> items = _generateItems();

    return Column(
      children: items,
    );
  }
}
