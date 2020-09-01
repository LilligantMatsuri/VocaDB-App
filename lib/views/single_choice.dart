import 'package:flutter/material.dart';

class SingleChoicePage<T> extends StatefulWidget {
  final String title;
  final List<ChoiceOption> options;
  final T value;
  final Function onSelected;

  const SingleChoicePage(
      {Key key, this.title, this.options, this.value, this.onSelected})
      : super(key: key);

  static navigate(BuildContext context,
      {String title,
      List<ChoiceOption> options,
      dynamic value,
      Function onSelected}) {
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) => SingleChoicePage(
                  title: title,
                  options: options,
                  value: value,
                  onSelected: onSelected,
                )));
  }

  @override
  _SingleChoicePageState createState() => _SingleChoicePageState();
}

class _SingleChoicePageState extends State<SingleChoicePage> {
  dynamic _currentValue;

  @override
  void initState() {
    super.initState();
    setState(() {
      _currentValue = widget.value;
    });
  }

  void onChanged(dynamic value) {
    setState(() {
      _currentValue = value;
    });

    if (widget.onSelected != null) widget.onSelected(value);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: ListView.builder(
        itemCount: widget.options.length,
        itemBuilder: (context, index) => RadioListTile(
          title: Text(widget.options[index].label),
          value: widget.options[index].value,
          groupValue: _currentValue,
          onChanged: onChanged,
        ),
      ),
    );
  }
}

class SingleChoiceInput<T> extends StatelessWidget {
  final String title;
  final String defaultLabel;
  final T defaultValue;
  final String selectedLabel;
  final T selectedValue;
  final List<ChoiceOption> options;
  final Function onSelected;

  const SingleChoiceInput(
      {this.title,
      this.defaultLabel,
      this.defaultValue,
      this.selectedLabel,
      this.selectedValue,
      this.options,
      this.onSelected});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        ListTile(
            onTap: () {
              SingleChoicePage.navigate(
                context,
                title: this.title,
                options: this.options,
                value: this.selectedValue,
                onSelected: this.onSelected,
              );
            },
            title: Text(this.title),
            subtitle: Text(
              (this.selectedValue == null)
                  ? this.defaultLabel
                  : this.selectedValue,
            )),
      ],
    );
  }
}

class ChoiceOption<T> {
  final String label;
  final T value;

  ChoiceOption({this.label, this.value});
}
