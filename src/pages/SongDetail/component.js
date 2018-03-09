import React from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import CenterView from './../../components/CenterView'
import ArtistList from '../../modules/artist/ArtistList'
import AlbumList from '../../modules/album/AlbumList'
import { Button } from 'react-native-elements'
import Icon from './../../components/Icon'
import TagGroup from '../../modules/tag/TagGroup'
import Info from './../../components/Info'
import ArtistRoleList from '../../modules/artistRole/ArtistRoleList'
import WebLinkList from '../../modules/webLink/WebLinkList'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import PVList from '../../modules/pv/PVLIst'
import LyricGroup from '../../modules/lyric/LyricGroup'
import Cover from './../../components/Cover'
import Divider from './../../components/Divider'
import Theme from './../../theme'

export default class SongDetailPage extends React.Component {

    componentDidMount () {
        const { params } = this.props.navigation.state;
        this.props.fetchSong(params.id)
    }

    render () {
        const song = this.props.song

        if(!song) {
            return (<View>
                <Text></Text>
            </View>)
        }


        const Section = props => (<View style={[{ paddingHorizontal: 4 },props.style]}>{props.children}</View>)

        const InfoPage = props => {

            const renderTagGroup = () => (
                <Section>
                    <Divider />
                    <TagGroup tags={song.tags} max={5} onPressTag={this.props.onPressTag} />
                </Section>
            )

            const renderPVList = () => (
                <Section>
                    <Divider />
                    <PVList pvs={song.pvs} type='Original' title='Original PVs' showHeader />
                </Section>
            )

            const renderAlbumList = () => (
                <Section>
                    <Divider />
                    <AlbumList max={3} albums={song.albums} title='Albums' onPressItem={this.props.onPressAlbum} showHeader />
                </Section>
            )

            const renderWebLinkList = () => (
                <Section>
                    <Divider />
                    <WebLinkList webLinks={song.webLinks} category='Official' title='Official' />
                </Section>
            )

            return (
                <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                    <Cover
                        imageUri={song.thumbUrl}
                        title={song.defaultName}
                        subtitle={song.artistString}
                    />
                    <Section style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Icon name='md-heart' text='Favorite' />
                        <Icon name='md-share' text='Share' onPress={() => this.props.onPressShare(song)} />
                        <Icon name='md-chatbubbles' text='Comment' />
                        <Icon name='md-information-circle'  text='Report' />
                    </Section>

                    {song.tags.length > 0 && renderTagGroup()}
                    {song.pvs.length > 0 && renderPVList()}
                    {song.albums.length > 0 && renderAlbumList()}
                    {song.webLinks.length > 0 && renderWebLinkList()}

                </ScrollView>
            )
        }

        const ArtistRoleListPage = () => (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <ArtistRoleList artists={song.artists} onPressItem={this.props.onPressArtist} displayRole />
            </ScrollView>
        )

        const LyricGropuPage = () => (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <LyricGroup lyrics={song.lyrics} />
            </ScrollView>
        )

        return (
            <ScrollableTabView>
                <InfoPage tabLabel='Info' />
                <ArtistRoleListPage tabLabel='Artists' />
                {song.lyrics.length > 0 && <LyricGropuPage tabLabel='Lyrics' />}
            </ScrollableTabView>
        )
    }
}