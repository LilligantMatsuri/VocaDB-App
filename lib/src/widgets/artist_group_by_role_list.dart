import 'package:flutter/material.dart';
import 'package:vocadb_app/models.dart';
import 'package:vocadb_app/widgets.dart';
import 'package:get/get.dart';

/// A widget display list of artists and grouping by role
class ArtistGroupByRoleList extends StatelessWidget {
  final List<ArtistRoleModel> artistRoles;

  final Function(ArtistRoleModel) onTap;

  final bool displayRole;

  const ArtistGroupByRoleList(
      {@required this.artistRoles, this.onTap, this.displayRole = true});

  ArtistGroupByRoleList.fromArtistSongModel(
      {@required List<ArtistSongModel> artistSongs,
      this.onTap,
      this.displayRole = true})
      : artistRoles = artistSongs
            .map((e) => ArtistRoleModel(
                id: e.artistId,
                name: e.name,
                imageUrl: e.artistImageUrl,
                role: e.artistRole))
            .toList();

  ArtistGroupByRoleList.fromArtistAlbumModel(
      {@required List<ArtistAlbumModel> artistAlbums,
      this.onTap,
      this.displayRole = true})
      : artistRoles = artistAlbums
            .map((e) => ArtistRoleModel(
                id: e.artistId,
                name: e.name,
                imageUrl: e.artistImageUrl,
                role: e.artistRole))
            .toList();

  ArtistGroupByRoleList.fromArtistEventModel(
      {@required List<ArtistEventModel> artistEvents,
      this.onTap,
      this.displayRole = true})
      : artistRoles = artistEvents
            .map((e) => ArtistRoleModel(
                id: e.artistId,
                name: e.artistName,
                imageUrl: e.artistImageUrl,
                role: e.artistRole))
            .toList();

  List<Widget> _generateItems() {
    List<Widget> items = [];
    List<ArtistRoleModel> producers = [];
    List<ArtistRoleModel> vocalists = [];
    List<ArtistRoleModel> others = [];

    this.artistRoles.forEach((e) {
      if (e.isProducer) producers.add(e);
      if (e.isVocalist) vocalists.add(e);
      if (e.isOtherRole) others.add(e);
    });

    if (producers.isNotEmpty) {
      if (displayRole)
        items.add(ListTile(
          title: Text('producers'.tr),
        ));
      items.addAll(producers.map(_mapArtistTile));
    }

    if (vocalists.isNotEmpty) {
      if (displayRole)
        items.add(ListTile(
          title: Text('vocalists'.tr),
        ));
      items.addAll(vocalists.map(_mapArtistTile));
    }

    if (others.isNotEmpty) {
      if (displayRole)
        items.add(ListTile(
          title: Text('other'.tr),
        ));
      items.addAll(others.map(_mapOtherArtistTile));
    }

    return items;
  }

  ArtistTile _mapArtistTile(ArtistRoleModel model) {
    return ArtistTile(
      name: model.name,
      imageUrl: model.imageUrl,
      onTap: () => this.onTap(model),
    );
  }

  ArtistTile _mapOtherArtistTile(ArtistRoleModel model) {
    return ArtistTile(
      name: model.name,
      subtitle: model.role,
      imageUrl: model.imageUrl,
      onTap: () => this.onTap(model),
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
