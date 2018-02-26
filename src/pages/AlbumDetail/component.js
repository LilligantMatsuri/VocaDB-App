import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import images from './../../assets/images'
import Icon from './../../components/Icon'
import Theme from './../../theme'
import TagGroup from './../../components/TagGroup'
import WebLinkList from './../../components/WebLinkList'
import EventList from './../../components/EventList'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import ArtistRoleList from './../../components/ArtistRoleList'
import Cover from './../../components/Cover'
import Content from './../../components/Content'
import TrackList from './../../components/TrackList'
import Divider from './../../components/Divider'

class AlbumDetailPage extends React.Component {
    componentDidMount () {
        const { params } = this.props.navigation.state;
        this.props.fetchAlbum(params.id)
    }

    render () {

        const { params } = this.props.navigation.state;
        const imageUri = images.getAlbumUri(params.id)

        const album = this.props.album

        console.log(album)

        const Section = props => (<View style={[{ marginVertical: 8, paddingHorizontal: 4 },props.style]}>{props.children}</View>)

        const renderTagGroup = () => (
            <Section>
                <Divider />
                <TagGroup tags={album.tags} max={5} onPressTag={this.props.onPressTag} />
            </Section>
        )

        const renderDescription = () => (
            <Section>
                <Text style={Theme.body}>{album.description}</Text>
            </Section>
        )

        const renderTracks = () => (
            <Section>
                <Divider />
                <TrackList tracks={album.tracks} onPressItem={this.props.onPressTrack} />
            </Section>
        )

        const renderWebLinks = () => (
            <Section>
                <Divider />
                <WebLinkList webLinks={album.webLinks} category='Official' title='Official' />
                <WebLinkList webLinks={album.webLinks} category='Commercial' title='Commercial' />
                <WebLinkList webLinks={album.webLinks} category='Reference' title='Reference' />
            </Section>
        )

        const InfoPage = () => (
            <Content>
                <Cover
                    imageUri={imageUri}
                    title={album.name}
                    subtitle={album.artistString}
                />
                <Section style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Icon name='md-heart' text='Follow' />
                    <Icon name='md-share' text='Share' onPress={() => this.props.onPressShare(album)} />
                    <Icon name='md-chatbubbles' text='Comment' />
                    <Icon name='md-information-circle'  text='Report' />
                </Section>

                {album.tags.length > 0 && renderTagGroup()}
                {album.description > 0 && renderDescription()}
                {album.tracks.length > 0 && renderTracks()}
                {album.webLinks.length > 0 && renderWebLinks()}

            </Content>
        )

        const ArtistRoleListPage = () => (
            <Content>
                <ArtistRoleList artists={album.artists} onPressItem={this.props.onPressArtist} />
            </Content>
        )

        const EventListPage = () => (
            <Content>
                <EventList events={album.releaseEvents} />
            </Content>
        )

        return (
            <ScrollableTabView>
                <InfoPage tabLabel='Info' />
                <ArtistRoleListPage tabLabel='Artists' />
                {album.releaseEvents != undefined && <EventListPage tabLabel='Events' />}
            </ScrollableTabView>
        )
    }
}

export default AlbumDetailPage