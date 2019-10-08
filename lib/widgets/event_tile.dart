import 'package:flutter/material.dart';
import 'package:vocadb/models/entry_model.dart';
import 'package:vocadb/pages/event_detail/event_detail_page.dart';

class EventTile extends StatelessWidget {
  final int id;

  final String imageUrl;

  final String name;

  final String tag;

  const EventTile({Key key, this.id, this.name, this.imageUrl, this.tag})
      : super(key: key);

  EventTile.fromEntry(EntryModel entry, {this.tag})
      : this.id = entry.id,
        this.imageUrl = entry.imageUrl,
        this.name = entry.name;

  void navigateToDetail(BuildContext context) {
    Navigator.pushNamed(context, ReleaseEventDetailScreen.routeName,
        arguments: ReleaseEventDetailScreenArguments(this.id, this.name,
            thumbUrl: this.imageUrl, tag: tag));
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: () => navigateToDetail(context),
      leading: SizedBox(
        width: 50,
        height: 50,
        child: Hero(
            tag: tag,
            child: Image.network(
              this.imageUrl,
              fit: BoxFit.fill,
            )),
      ),
      title: Text(this.name, overflow: TextOverflow.ellipsis),
    );
  }
}
