import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import Theme from './../../theme'

class Lyric extends React.Component {
    render () {
        return (
            <View>
                <Text style={Theme.body}>{this.props.content}</Text>
            </View>
        )
    }
}

Lyric.propTypes = {
    source: PropTypes.string,
    url: PropTypes.string,
    content: PropTypes.string
}

export default Lyric;